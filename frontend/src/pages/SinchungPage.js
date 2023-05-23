import { Link } from "react-router-dom";
import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";

const SinchungPage = () => {
  const [studentId, setStudentId] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get("http://localhost:4000/auth/authcheck", { withCredentials: true }).then((res) => {
      console.log(res.data);
      if (res.data.isLogin === "True") {
        setStudentId(res.data.studentId);
        setIsLogin(true);
      }
    });
  }, [isLogin]);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:4000/application/application", {
        student_id: studentId,
        start_date: data.start_date,
        end_date: data.end_date,
        reason: data.reason,
      })
      .then((res) => {
        console.log(res);
        alert("신청이 완료되었습니다.");
        window.location.href = "/main";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <HeaderContainer></HeaderContainer>
      <div className="flex overflow-hidden bg-white pt-16">
        <SidebarContainer></SidebarContainer>
        <div id="main-content" className="h-full w-full bg-blue-200 relative overflow-y-auto lg:ml-64 pt-3">
          <main>
            <div className="py-9 px-4">
              <div className="w-full gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  {/* 카드 */}
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold leading-none text-gray-900">외박신청</h1>
                  </div>
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
                    <div className="container mx-auto mb-5">
                      <p>위 작성인은 외박신청서를 사실대로 작성하였음을 확인합니다.</p>
                      <p className="mb-3">외박 시 방역수칙을 준수하며 코로나-19 감염증과 관련된 문제 발생 시 모든 책임은 본인에게 있음을 확인합니다.</p>
                      <div className="items-center flex">
                        <span>확인하였음 </span>
                        <input
                          {...register("agree", {
                            required: { value: true, message: "체크해주세요" },
                          })}
                          id="agree"
                          className={
                            errors.agree
                              ? "border border-red-500 rounded-xl shadow-md px-2 w-4 h-4 mx-2"
                              : "border border-black rounded-xl shadow-md px-2 w-4 h-4 mx-2"
                          }
                          type="checkbox"
                        />
                      </div>
                      {errors.agree && <span className="text-red-500">{errors.agree.message}</span>}
                    </div>
                    <div className="container mx-auto mb-5">
                      <button className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex">
                        외박신청
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SinchungPage;
