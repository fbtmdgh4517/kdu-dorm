import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import UserPage from "./UserPage";
import { useRecoilState } from "recoil";
import userAuthInfoState from "../state";

const LoginPage = (props) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const onSubmit = (data) => {
        axios
            .post(
                "http://localhost:4000/auth/login",
                {
                    student_id: data.student_id,
                    student_password: data.student_password,
                },
                { withCredentials: true }
            )
            .then((res) => {
                if (res.data.isLogin !== "True") {
                    setErrMessage(res.data.isLogin);
                }
                console.log(res.data);
                if (res.data.isLogin === "True") {
                    setUser(res.data.studentName);
                    setIsLogin(true);
                    navigate("/main");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>
            <Link className="text-center my-20 w-[360px] mx-auto text-3xl font-bold flex items-center justify-center self-center" to="/">
                경동대학교 기숙사 외박신청
            </Link>
            <div className="border border-blue-200 w-[360px] mx-auto rounded-xl shadow-md p-8 bg-white mb-4">
                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                    <div className="max-w-md container mx-auto mb-8">
                        <label htmlFor="student_id" className="font-medium">
                            학번
                        </label>
                        <input
                            id="student_id"
                            {...register("student_id")}
                            className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 transition ease-in-out hover:scale-105 px-2"
                        />
                    </div>
                    <div className="max-w-md container mx-auto mb-8">
                        <label htmlFor="student_password" className="font-medium">
                            비밀번호
                        </label>
                        <input
                            id="student_password"
                            {...register("student_password")}
                            className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 transition ease-in-out hover:scale-105 px-2"
                            type="password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex"
                    >
                        로그인
                    </button>
                    {errMessage && <div className="text-center text-red-500 mt-2">{errMessage}</div>}
                </form>
                <Link
                    className="h-[35px] w-[85px] items-center justify-center self-center flex mx-auto pt-4 text-base font-medium text-gray-500 sm:flex underline"
                    to="/signup"
                >
                    회원가입
                </Link>
            </div>
        </>
    );
};

export default LoginPage;
