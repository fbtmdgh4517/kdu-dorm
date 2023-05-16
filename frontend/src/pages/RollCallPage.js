import { useEffect, useState } from "react";
import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilValueLoadable } from "recoil";
import { studentListSelector } from "../state";

const RollCallPage = () => {
  const [todayDate, setTodayDate] = useState({});
  const [selectedOption, setSelectedOption] = useState("미완료");
  const [options, setOptions] = useState(["미완료", "완료", "무단외박"]);
  const [rollCallList, setRollCallList] = useState([]);
  const [selectClassName, setSelectClassName] = useState(
    "shadow-md rounded-3xl h-[40px] w-[90px] bg-gray-500 items-center text-base font-medium text-white text-center"
  );
  const studentList = useRecoilValueLoadable(studentListSelector);
  const [roomList, setRoomList] = useState({});
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const day = dayOfWeek[new Date().getDay()];

  const fetchRollCallList = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/rollCall/rollCallList/${year}-${month}-${date}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setRollCallList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTodayDate({ year, month, date, day });
    fetchRollCallList();
  }, []);

  useEffect(() => {
    if (studentList.state === "hasValue") {
      const roomStudent = studentList.contents.data.reduce((acc, cur) => {
        const room = cur.student_room;
        if (acc[room]) {
          acc[room].push(cur);
        } else {
          acc[room] = [cur];
        }
        return acc;
      }, {});
      console.log(roomStudent);
      setRoomList(roomStudent);
    }
  }, [studentList.state]);

  const onOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "완료") {
      e.target.className = "shadow-md rounded-3xl h-[40px] w-[90px] bg-blue-500 items-center text-base font-medium text-white text-center";
    } else if (e.target.value === "미완료") {
      e.target.className = "shadow-md rounded-3xl h-[40px] w-[90px] bg-gray-500 items-center text-base font-medium text-white text-center";
    } else if (e.target.value === "무단외박") {
      e.target.className = "shadow-md rounded-3xl h-[40px] w-[90px] bg-red-500 items-center text-base font-medium text-white text-center";
    }
  };

  const onSubmit = async (data) => {
    try {
      for (let key in data) {
        if (data[key] === "미완료") {
          alert("미완료 학생이 있습니다. 확인 후 다시 시도해주세요.");
          return;
        }
      }
      console.log(data);
      console.log(Object.keys(data)[0]);
      console.log(Object.values(data));
      const res = await axios.post(
        "http://localhost:4000/rollCall/checkComplete",
        {
          studentId: Object.keys(data),
          isChecked: Object.values(data),
          date: `${todayDate.year}-${todayDate.month}-${todayDate.date}`,
        },
        {
          withCredentials: true,
        }
      );
      alert("점호가 완료되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeaderContainer></HeaderContainer>
      <div className="flex overflow-hidden bg-white pt-16">
        <SidebarContainer></SidebarContainer>
        <div id="main-content" className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64">
          <main>
            <div className="py-6 px-4">
              <div className="w-full grid grid-cols-1 xl:grid-cols-1 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  {/* 카드 */}
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold leading-none text-gray-900">점호</h1>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold m-4">
                      {todayDate.year}년 {todayDate.month}월 {todayDate.date}일 {todayDate.day}요일
                    </p>
                    <div>
                      <form method="post" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                          {Object.keys(roomList).map((room) => (
                            <div className="bg-blue-200 shadow rounded-lg p-3 lg:p-4" key={room}>
                              <p className="text-lg font-semibold mb-3">{room}호</p>
                              <div className="grid grid-cols-2 gap-4">
                                {roomList[room].map((student) => (
                                  <div key={student.student_id}>
                                    <p htmlFor={student.student_id} className="font-semibold">
                                      {student.student_name}
                                    </p>
                                    {
                                      /* student.student_id의 값이랑 rollCallList.student_id의 값이 같은 rollCallList를 찾고 해당 student_id에 해당하는 값을 가진 학생의 is_checked 값을 가져오는 코드 */
                                      // console.log(rollCallList.find((rollCall) => rollCall.student_id === student.student_id).is_checked)
                                      rollCallList.length === 0 ? (
                                        <select
                                          {...register(`${student.student_id.toString()}`, {
                                            required: {
                                              value: true,
                                              message: "필수 항목입니다.",
                                            },
                                          })}
                                          id={student.student_id}
                                          className={selectClassName}
                                          onChange={onOptionChange}
                                        >
                                          <option value="미완료">미완료</option>
                                          <option value="완료">완료</option>
                                          <option value="무단외박">무단외박</option>
                                        </select>
                                      ) : (
                                        <select
                                          {...register(`${student.student_id.toString()}`, {
                                            required: {
                                              value: true,
                                              message: "필수 항목입니다.",
                                            },
                                          })}
                                          id={student.student_id}
                                          className={
                                            rollCallList.find((rollCall) => rollCall.student_id === student.student_id).is_checked === "완료"
                                              ? "shadow-md rounded-3xl h-[40px] w-[90px] bg-blue-500 items-center text-base font-medium text-white text-center"
                                              : rollCallList.find((rollCall) => rollCall.student_id === student.student_id).is_checked === "무단외박"
                                              ? "shadow-md rounded-3xl h-[40px] w-[90px] bg-red-500 items-center text-base font-medium text-white text-center"
                                              : "shadow-md rounded-3xl h-[40px] w-[90px] bg-gray-500 items-center text-base font-medium text-white text-center"
                                          }
                                          onChange={onOptionChange}
                                          value={rollCallList.find((rollCall) => rollCall.student_id === student.student_id).is_checked}
                                          disabled
                                        >
                                          <option value="미완료">미완료</option>
                                          <option value="완료">완료</option>
                                          <option value="무단외박">무단외박</option>
                                        </select>
                                      )
                                    }
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        {rollCallList.length === 0 && (
                          <button className="shadow-md rounded-3xl h-[40px] w-[100px] bg-gray-500 items-center justify-center self-center text-base font-medium text-white mx-auto flex">
                            제출
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default RollCallPage;
