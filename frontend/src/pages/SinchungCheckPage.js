import { Link, useParams } from "react-router-dom";
import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { userAuthInfoSelector } from "../state";

const SinchungCheckPage = () => {
  //관리자가 체크하는 페이지
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [applicationInfo, setApplicationInfo] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isRefused, setIsRefused] = useState(false);
  const [isUpdateBtnClicked, setIsUpdateBtnClicked] = useState(false);
  const userAuthInfo = useRecoilValue(userAuthInfoSelector);

  const fetchData = async () => {
    // console.log(id);
    await axios
      .get(`http://localhost:4000/application/detail/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setApplicationInfo(res.data[0]);
        const startDate = new Date(res.data[0].start_date);
        const endDate = new Date(res.data[0].end_date);
        endDate.setDate(endDate.getDate() - 1);
        const applicationStartYear = startDate.getFullYear();
        const applicationStartMonth = startDate.getMonth() + 1;
        const applicationStartDate = startDate.getDate();
        const applicationEndYear = endDate.getFullYear();
        const applicationEndMonth = endDate.getMonth() + 1;
        const applicationEndDate = endDate.getDate();
        setStartDate(`${applicationStartYear}-${applicationStartMonth}-${applicationStartDate}`);
        setEndDate(`${applicationEndYear}-${applicationEndMonth}-${applicationEndDate}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleUpdateButtonClicked = () => {
    setIsUpdateBtnClicked(!isUpdateBtnClicked);
  };

  const onAcceptApplication = async () => {
    await axios
      .put(`/application/accept/${id}`, { withCredentials: true })
      .then((res) => {
        alert("외박 신청 승인이 완료되었습니다.");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRefuseApplication = async (data) => {
    await axios
      .put(
        `/application/refuse/${id}`,
        {
          rejection_reason: data.rejection_reason,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        alert("외박 신청 거부가 완료되었습니다.");
        setIsRefused(!isRefused);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (data) => {
    const { start_date, end_date, reason } = data;
    const res = await axios.patch(`/application/update/${id}`, { start_date, end_date, reason }, { withCredentials: true });
    if (res.status === 200) {
      alert("외박 신청 수정이 완료되었습니다.");
      setIsUpdateBtnClicked(false);
      fetchData();
    }
  };

  const onDeleteApplication = async () => {
    if (confirm("정말 삭제하시겠습니까?") === true) {
      const res = await axios.delete(`/application/delete/${id}`, { withCredentials: true });
      if (res.status === 200) {
        alert("외박 신청 삭제가 완료되었습니다.");
        window.location.href = "/main";
      }
    } else {
      return;
    }
  };

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
                    <h1 className="text-xl font-bold leading-none text-gray-900">외박신청</h1>
                  </div>
                  {/* 수정 버튼을 눌렀을 경우 외박 사유 입력 폼, 수정 취소 버튼 출력 */}
                  {isUpdateBtnClicked ? (
                    <>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container mx-auto mb-5">
                          <label htmlFor="start_date" className="font-medium">
                            외박 시작일
                          </label>
                          <input
                            {...register("start_date", {
                              required: { value: true, message: "외박 시작일을 입력하세요" },
                            })}
                            id="start_date"
                            className={
                              errors.start_date
                                ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                                : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                            }
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                          />
                          {errors.start_date && <span className="text-red-500">{errors.start_date.message}</span>}
                        </div>
                        <div className="container mx-auto mb-5">
                          <label htmlFor="end_date" className="font-medium">
                            외박 종료일
                          </label>
                          <input
                            {...register("end_date", {
                              required: { value: true, message: "외박 종료일을 입력하세요" },
                            })}
                            id="end_date"
                            className={
                              errors.end_date
                                ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                                : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                            }
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                          />
                          {errors.end_date && <span className="text-red-500">{errors.end_date.message}</span>}
                        </div>
                        <div className="container mx-auto mb-5">
                          <label htmlFor="reason" className="font-medium">
                            외박 사유
                          </label>
                          <input
                            {...register("reason", {
                              required: { value: true, message: "외박 사유를 입력하세요" },
                            })}
                            id="reason"
                            className={
                              errors.reason
                                ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                                : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                            }
                            type="text"
                          />
                          {errors.reason && <span className="text-red-500">{errors.reason.message}</span>}
                        </div>
                        <div className="flex justify-between  md:mx-40 my-5">
                          <button
                            type="submit"
                            className="shadow-md h-9 w-20 bg-blue-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-blue-700 transition ease-in-out hover:scale-110"
                          >
                            수정
                          </button>
                          <button
                            onClick={toggleUpdateButtonClicked}
                            className="shadow-md h-9 w-20 bg-red-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-red-700 transition ease-in-out hover:scale-110"
                          >
                            취소
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    // 외박신청 정보
                    <>
                      <div className="container mx-auto mb-5">
                        <h1 className="font-semibold">학번</h1>
                        <span>{applicationInfo.student_id}</span>
                      </div>
                      <div className="container mx-auto mb-5">
                        <h1 className="font-semibold">학과</h1>
                        <span>{applicationInfo.student_department}</span>
                      </div>
                      <div className="container mx-auto mb-5">
                        <h1 className="font-semibold">이름</h1>
                        <span>{applicationInfo.student_name}</span>
                      </div>
                      <div className="container mx-auto mb-5">
                        <h1 className="font-semibold">호실</h1>
                        <span>{applicationInfo.student_room}</span>
                      </div>
                      <div className="container mx-auto mb-5">
                        <h1 className="font-semibold">연락처</h1>
                        <span>{applicationInfo.student_contact}</span>
                      </div>
                      <div className="container mx-auto mb-5">
                        <h1 className="font-semibold">외박 시작일</h1>
                        <span>{startDate}</span>
                      </div>
                      <div className="container mx-auto mb-5">
                        <h1 className="font-semibold">외박 종료일</h1>
                        <span>{endDate}</span>
                      </div>
                      <div className="container mx-auto mb-5">
                        <h1 className="font-semibold">외박 사유</h1>
                        <span>{applicationInfo.application_reason}</span>
                      </div>
                    </>
                  )}
                  {/* 학생 계정이고 수정 버튼을 누르지 않고 외박신청의 상태가 미확인일 경우 수정, 삭제 버튼 출력 */}
                  {!userAuthInfo.data.isAdmin && !isUpdateBtnClicked && applicationInfo.approval_status === "미확인" && (
                    <div className="flex justify-between  md:mx-40 my-5">
                      <button
                        onClick={toggleUpdateButtonClicked}
                        className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex"
                      >
                        수정
                      </button>
                      <button
                        onClick={onDeleteApplication}
                        className="shadow-md rounded-3xl h-[35px] w-[85px] bg-red-500 items-center justify-center self-center text-base font-medium text-white hover:bg-red-700 mx-auto transition ease-in-out hover:scale-110 flex"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                  {/* 관리자 계정이고 외박신청의 상태가 미확인일 경우 수락, 거절 버튼 출력 */}
                  {userAuthInfo.data.isAdmin && applicationInfo.approval_status === "미확인" && (
                    <div className="flex justify-between md:mx-40 my-5">
                      <button
                        onClick={onAcceptApplication}
                        className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex"
                      >
                        수락
                      </button>
                      <button
                        onClick={() => {
                          setIsRefused(!isRefused);
                        }}
                        className="shadow-md rounded-3xl h-[35px] w-[85px] bg-red-500 items-center justify-center self-center text-base font-medium text-white hover:bg-red-700 mx-auto transition ease-in-out hover:scale-110 flex"
                      >
                        거절
                      </button>
                    </div>
                  )}
                  {/* 관리자 계정이고 거절 버튼을 눌렀을 경우 거부 사유 입력 폼, 제출 취소 버튼 출력 */}
                  {userAuthInfo.data.isAdmin && isRefused && (
                    <form method="put" onSubmit={handleSubmit(onRefuseApplication)}>
                      <input
                        {...register("rejection_reason", {
                          required: {
                            value: true,
                            message: "거부 사유를 입력하세요",
                          },
                        })}
                        id="rejection_reason"
                        className={
                          errors.rejection_reason
                            ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                            : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                        }
                        // className="border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                        placeholder="거부 사유를 입력하세요"
                      />
                      {errors.rejection_reason && <span className="text-red-500">{errors.rejection_reason.message}</span>}
                      <div className="flex justify-between  md:mx-40 my-5">
                        <button
                          type="submit"
                          className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex"
                        >
                          제출
                        </button>
                        <button
                          onClick={() => {
                            setIsRefused(!isRefused);
                          }}
                          className="shadow-md rounded-3xl h-[35px] w-[85px] bg-red-500 items-center justify-center self-center text-base font-medium text-white hover:bg-red-700 mx-auto transition ease-in-out hover:scale-110 flex"
                        >
                          취소
                        </button>
                      </div>
                    </form>
                  )}
                  {/* 외박신청의 상태가 승인일 경우 */}
                  {applicationInfo.approval_status === "승인" && <p className="text-center text-green-600 font-medium text-lg mt-4">승인된 외박신청입니다.</p>}
                  {/* 외박신청의 상태가 거부일 경우 */}
                  {applicationInfo.approval_status === "거부" && (
                    <>
                      <p className="text-center text-red-600 font-medium text-lg mt-4">거부된 외박신청입니다.</p>
                      <p className="text-center text-red-600 font-medium text-lg mt-4">거부 사유: {applicationInfo.rejection_reason}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SinchungCheckPage;
