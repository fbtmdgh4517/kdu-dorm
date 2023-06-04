import { useEffect, useState } from "react";
import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import axios from "axios";
import { useRecoilValueLoadable } from "recoil";
import { studentListSelector, userAuthInfoSelector } from "../state";

const RollCallRecordPage = () => {
  const [todayDate, setTodayDate] = useState({});
  const [rollCallList, setRollCallList] = useState([]);
  const [roomList, setRoomList] = useState({});
  const studentList = useRecoilValueLoadable(studentListSelector);
  const userAuthInfo = useRecoilValueLoadable(userAuthInfoSelector);

  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = dayOfWeek[today.getDay()];

  const fetchRollCallList = async (date) => {
    try {
      const res = await axios.get(`/rollCall/rollCallList/${date}`, {
        withCredentials: true,
      });
      setRollCallList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInputDate = (e) => {
    fetchRollCallList(e.target.value);
  };

  useEffect(() => {
    setTodayDate({ year, month, date, day });
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
      setRoomList(roomStudent);
    }
  }, [studentList.state]);

  useEffect(() => {
    if (userAuthInfo.state === "hasValue" && userAuthInfo.contents.data.isLogin === "True" && userAuthInfo.contents.data.isAdmin === false) {
      alert("관리자만 접근 가능합니다.");
      window.location.href = "/main";
    }
  }, [userAuthInfo.state]);

  return (
    <>
      <HeaderContainer></HeaderContainer>
      <div className="flex overflow-hidden pt-16">
        <SidebarContainer></SidebarContainer>
        <div id="main-content" className="h-full w-full bg-blue-200 relative overflow-y-auto lg:ml-56">
          <main>
            <div className="py-9 px-4">
              <div className="w-full grid grid-cols-1 gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  {/* 카드 */}
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold leading-none text-gray-900">점호 기록</h1>
                  </div>
                  <div className="text-center">
                    <input
                      type="date"
                      className="border border-black container mx-auto rounded-xl shadow-md h-10 px-2 mb-3"
                      max={new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString().split("T")[0]}
                      onChange={onChangeInputDate}
                    />
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                      {rollCallList.length === 0 ? (
                        <p>해당 날짜의 점호 기록이 없습니다.</p>
                      ) : (
                        Object.keys(roomList).map((room) => (
                          <div className="bg-blue-200 shadow rounded-lg p-3 lg:p-4" key={room}>
                            <p className="text-lg font-semibold mb-3">{room}호</p>
                            <div className="grid grid-cols-2 gap-4">
                              {roomList[room].map((student) => (
                                <div key={student.student_id}>
                                  <p htmlFor={student.student_id} className="font-semibold">
                                    {student.student_name}
                                  </p>
                                  {
                                    <input
                                      type="text"
                                      className={
                                        rollCallList.find((rollCall) => rollCall.student_id === student.student_id).is_checked === "완료"
                                          ? "shadow-md rounded-3xl h-[40px] w-[90px] bg-blue-500 items-center text-base font-medium text-white text-center"
                                          : rollCallList.find((rollCall) => rollCall.student_id === student.student_id).is_checked === "무단외박"
                                          ? "shadow-md rounded-3xl h-[40px] w-[90px] bg-red-600 items-center text-base font-medium text-white text-center"
                                          : "shadow-md rounded-3xl h-[40px] w-[90px] bg-green-600 items-center text-base font-medium text-white text-center"
                                      }
                                      disabled
                                      value={rollCallList.find((rollCall) => rollCall.student_id === student.student_id).is_checked}
                                    />
                                  }
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      )}
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

export default RollCallRecordPage;
