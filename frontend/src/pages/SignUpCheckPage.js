import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import { useForm } from "react-hook-form";

const SignupCheckPage = () => {
  const { id } = useParams();
  const [signupRequestInfo, setSignupRequestInfo] = useState({});
  const [isRejected, setIsRejected] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchData = async () => {
    await axios
      .get(`http://localhost:4000/auth/signupRequest/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data[0]);
        setSignupRequestInfo(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onAcceptSignupRequest = async () => {
    await axios
      .put(`http://localhost:4000/auth/signupRequest/accept/${id}`, { withCredentials: true })
      .then((res) => {
        alert("회원가입 요청 승인이 완료되었습니다.");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRejectSignupRequest = async (data) => {
    await axios
      .put(
        `http://localhost:4000/auth/signupRequest/reject/${id}`,
        {
          rejection_reason: data.rejection_reason,
        },
        { withCredentials: true }
      )
      .then((res) => {
        alert("회원가입 요청 거부가 완료되었습니다.");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
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
                    <h1 className="text-xl font-bold leading-none text-gray-900">회원가입 신청</h1>
                  </div>
                  <div className="container mx-auto mb-5">
                    <h1 className="font-medium">학번</h1>
                    <span>{signupRequestInfo.student_id}</span>
                  </div>
                  <div className="container mx-auto mb-5">
                    <h1 className="font-medium">학과</h1>
                    <span>{signupRequestInfo.student_department}</span>
                  </div>
                  <div className="container mx-auto mb-5">
                    <h1 className="font-medium">이름</h1>
                    <span>{signupRequestInfo.student_name}</span>
                  </div>
                  <div className="container mx-auto mb-5">
                    <h1 className="font-medium">연락처</h1>
                    <span>{signupRequestInfo.student_contact}</span>
                  </div>
                  <div className="container mx-auto mb-5">
                    <h1 className="font-medium">호실</h1>
                    <span>{signupRequestInfo.student_room}</span>
                  </div>
                  {signupRequestInfo.request_status === "미확인" && (
                    <div className="flex justify-between  md:mx-40 my-5">
                      <button
                        onClick={onAcceptSignupRequest}
                        className="shadow-md h-[35px] w-[85px] bg-blue-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-blue-700 transition ease-in-out hover:scale-110"
                      >
                        수락
                      </button>
                      <button
                        onClick={() => {
                          setIsRejected(!isRejected);
                        }}
                        className="shadow-md h-[35px] w-[85px] bg-red-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-red-700 transition ease-in-out hover:scale-110"
                      >
                        거절
                      </button>
                    </div>
                  )}
                  {isRejected && signupRequestInfo.request_status === "미확인" && (
                    <form method="put" onSubmit={handleSubmit(onRejectSignupRequest)}>
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
                        placeholder="거부 사유를 입력하세요"
                      />
                      {errors.rejection_reason && <span className="text-red-500">{errors.rejection_reason.message}</span>}
                      <button className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex">
                        제출
                      </button>
                    </form>
                  )}
                  {signupRequestInfo.request_status === "승인" && (
                    <div className="text-center text-green-600 font-medium text-lg mt-4">승인된 회원가입 신청입니다.</div>
                  )}
                  {signupRequestInfo.request_status === "거부" && (
                    <div className="text-center text-red-600 font-medium text-lg mt-4">거부된 회원가입 신청입니다.</div>
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

export default SignupCheckPage;
