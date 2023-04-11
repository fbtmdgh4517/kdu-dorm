import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserPage from './UserPage';

const LoginPage = (props) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/auth/authcheck', { withCredentials: true }).then((res) => {
            console.log(res.data);
            if (res.data.isLogin === 'True') {
                if (sessionStorage.getItem('studentName') === null) {
                    console.log('세션에 값이 없습니다.');
                } else {
                    console.log('세션에 값이 있습니다.');
                    setUser(sessionStorage.getItem('studentName'));
                    setIsLogin(true);
                }
            }
        });
        // if (sessionStorage.getItem('studentName') === null) {
        //     console.log('세션에 값이 없습니다.');
        // } else {
        //     console.log('세션에 값이 있습니다.');
        //     setUser(sessionStorage.getItem('studentName'));
        //     setIsLogin(true);
        // }
    }, [isLogin]);

    const onSubmit = (data) => {
        axios
            .post(
                'http://localhost:4000/auth/login',
                {
                    student_id: data.student_id,
                    student_password: data.student_password,
                },
                { withCredentials: true }
            )
            .then((res) => {
                console.log(res.data);
                if (res.data.isLogin === 'True') {
                    setUser(res.data.studentName);
                    sessionStorage.setItem('studentName', res.data.studentName);
                    setIsLogin(true);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const removeUserHandler = () => {
        // setUser('');
        sessionStorage.removeItem('studentName');
        setIsLogin(false);
    };

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:4000/auth/authcheck')
    //         .then((res) => {
    //             console.log(res.data);
    //             if (res.data.isLogin === 'True') {
    //                 setUser();
    //             }
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, []);

    console.log(user);

    return (
        <>
            {!isLogin ? (
                <>
                    <Link
                        className="text-center my-20 w-[360px] mx-auto text-3xl font-bold flex items-center justify-center self-center"
                        to="/"
                    >
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
                                    {...register('student_id')}
                                    className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 transition ease-in-out hover:scale-105 px-2"
                                />
                            </div>
                            <div className="max-w-md container mx-auto mb-8">
                                <label htmlFor="student_password" className="font-medium">
                                    비밀번호
                                </label>
                                <input
                                    id="student_password"
                                    {...register('student_password')}
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
                        </form>
                        <Link
                            className="mt-6 h-[35px] w-[85px] items-center justify-center self-center flex mx-auto px-2 py-0.5 text-base font-medium text-gray-500 sm:flex underline"
                            to="/signup"
                        >
                            회원가입
                        </Link>
                    </div>
                </>
            ) : (
                <UserPage userName={user} removeUserHandler={removeUserHandler} />
            )}
        </>
    );
};

export default LoginPage;
