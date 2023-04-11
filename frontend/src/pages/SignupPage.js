import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [phoneNumber, setPhoneNumber] = useState('');

    const onSubmit = (data) => {
        console.log(data);
        axios
            .post(
                'http://localhost:4000/auth/signupRequest',
                {
                    student_name: data.student_name,
                    student_id: data.student_id,
                    student_department: data.student_department,
                    student_contact: data.student_contact,
                    student_room: data.student_room,
                    student_password: data.student_password,
                },
                { withCredentials: true }
            )
            .then((res) => {})
            .catch((err) => {
                console.error(err);
            });
    };

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };

    useEffect(() => {
        console.log(phoneNumber);
        if (phoneNumber.length === 11) {
            setPhoneNumber(phoneNumber.replace(/ /g, '').replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3'));
        } else if (phoneNumber.length === 13) {
            setPhoneNumber(phoneNumber.replace(/-/g, '').replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3'));
        }
    }, [phoneNumber]);

    return (
        <>
            <Link
                className="text-center my-20 w-[360px] mx-auto text-3xl font-bold flex items-center justify-center self-center"
                to="/"
            >
                경동대학교 기숙사 외박신청
            </Link>
            <div className="border border-blue-200 max-w-sm w-11/12 mx-auto rounded-xl shadow-md p-8 bg-white mb-4">
                <form method="post" onSubmit={handleSubmit(onSubmit)}>
                    <div className="container mx-auto mb-5">
                        <label htmlFor="name" className="font-medium">
                            이름
                        </label>
                        <input
                            {...register('student_name', {
                                required: {
                                    value: true,
                                    message: '이름을 입력하세요',
                                },
                            })}
                            id="student_name"
                            className={
                                errors.student_name
                                    ? 'border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2'
                                    : 'border border-black container mx-auto rounded-xl shadow-md h-10 px-2'
                            }
                            // className="border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                            placeholder="ex) 홍길동"
                        />
                        {errors.student_name && <span className="text-red-500">{errors.student_name.message}</span>}
                    </div>
                    <div className="container mx-auto mb-5">
                        <label htmlFor="student_id" className="font-medium">
                            학번
                        </label>
                        <input
                            {...register('student_id', {
                                required: { value: true, message: '학번을 입력하세요' },
                                minLength: {
                                    value: 7,
                                    message: '학번은 7자이어야 합니다.',
                                },
                                maxLength: {
                                    value: 7,
                                    message: '학번은 7자이어야 합니다.',
                                },
                                validate: {
                                    isNumber: (value) => {
                                        if (isNaN(value)) {
                                            return '숫자만 입력하세요';
                                        }
                                        return true;
                                    },
                                },
                            })}
                            id="student_id"
                            className={
                                errors.student_id
                                    ? 'border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2'
                                    : 'border border-black container mx-auto rounded-xl shadow-md h-10 px-2'
                            }
                            placeholder="ex) 2024129"
                        />
                        {errors.student_id && <span className="text-red-500">{errors.student_id.message}</span>}
                    </div>
                    <div className="container mx-auto mb-5">
                        <label htmlFor="student_department" className="font-medium">
                            학과
                        </label>
                        <input
                            {...register('student_department', {
                                required: {
                                    value: true,
                                    message: '학과를 입력하세요',
                                },
                            })}
                            id="student_department"
                            className={
                                errors.student_department
                                    ? 'border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2'
                                    : 'border border-black container mx-auto rounded-xl shadow-md h-10 px-2'
                            }
                            placeholder="ex) OOO학과"
                        />
                        {errors.student_department && (
                            <span className="text-red-500">{errors.student_department.message}</span>
                        )}
                    </div>
                    <div className="container mx-auto mb-5">
                        <label htmlFor="student_contact" className="font-medium">
                            연락처
                        </label>
                        <input
                            {...register('student_contact', {
                                required: {
                                    value: true,
                                    message: '연락처를 입력하세요',
                                },
                            })}
                            id="student_contact"
                            className={
                                errors.student_contact
                                    ? 'border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2'
                                    : 'border border-black container mx-auto rounded-xl shadow-md h-10 px-2'
                            }
                            value={phoneNumber}
                            onChange={onChangePhoneNumber}
                            placeholder="ex) 01012345678 (-제외)"
                        />
                        {errors.student_contact && (
                            <span className="text-red-500">{errors.student_contact.message}</span>
                        )}
                    </div>
                    <div className="container mx-auto mb-5">
                        <label htmlFor="student_room" className="font-medium">
                            호실
                        </label>
                        <input
                            {...register('student_room', {
                                required: {
                                    value: true,
                                    message: '호실을 입력하세요',
                                },
                                minLength: {
                                    value: 4,
                                    message: '호실은 4자이어야 합니다.',
                                },
                                maxLength: {
                                    value: 4,
                                    message: '호실은 4자이어야 합니다.',
                                },
                                validate: {
                                    isNumber: (value) => {
                                        if (isNaN(value)) {
                                            return '숫자만 입력하세요';
                                        }
                                        return true;
                                    },
                                },
                            })}
                            id="student_room"
                            className={
                                errors.student_room
                                    ? 'border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2'
                                    : 'border border-black container mx-auto rounded-xl shadow-md h-10 px-2'
                            }
                            placeholder="ex) 6432"
                        />
                        {errors.student_room && <span className="text-red-500">{errors.student_room.message}</span>}
                    </div>
                    <div className="container mx-auto mb-5">
                        <label htmlFor="student_password" className="font-medium">
                            비밀번호
                        </label>
                        <input
                            {...register('student_password', {
                                required: {
                                    value: true,
                                    message: '비밀번호를 입력하세요',
                                },
                                minLength: {
                                    value: 6,
                                    message: '비밀번호는 6자 이상이어야 합니다.',
                                },
                            })}
                            id="student_password"
                            className={
                                errors.student_password
                                    ? 'border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2'
                                    : 'border border-black container mx-auto rounded-xl shadow-md h-10 px-2'
                            }
                            type="password"
                            placeholder="6자 이상"
                        />
                        {errors.student_password && (
                            <span className="text-red-500">{errors.student_password.message}</span>
                        )}
                    </div>
                    {/* <div className="container mx-auto mb-5">
                        <label htmlFor="email" className="font-medium">
                            이메일
                        </label>
                        <input
                            name="email"
                            id="email"
                            className={
                                errors.name
                                    ? 'border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2'
                                    : 'border border-black container mx-auto rounded-xl shadow-md h-10 px-2'
                            }
                            type="email"
                            placeholder="ex) abc1234@kduniv.ac.kr"
                        />
                    </div> */}
                    <button className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex">
                        회원가입
                    </button>
                </form>
            </div>
        </>
    );
};

export default SignupPage;
