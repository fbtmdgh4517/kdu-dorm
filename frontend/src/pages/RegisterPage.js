import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <>
            <Link
                className="text-center my-20 w-[360px] mx-auto text-3xl font-bold flex items-center justify-center self-center"
                to="/"
            >
                경동대학교 기숙사 외박신청
            </Link>
            <div className="border border-blue-200 max-w-sm w-11/12 mx-auto rounded-xl shadow-md p-8 bg-white mb-4">
                <form>
                    <div className="container mx-auto mb-5">
                        <label htmlFor="name" className="font-medium">
                            이름
                        </label>
                        <input
                            name="name"
                            id="name"
                            className="border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                            placeholder="ex) 홍길동"
                        />
                    </div>
                    <div className="container mx-auto mb-5">
                        <label htmlFor="student_id" className="font-medium">
                            학번
                        </label>
                        <input
                            name="student_id"
                            id="student_id"
                            className="border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                            placeholder="ex) 2024129"
                        />
                    </div>
                    <div className="container mx-auto mb-5">
                        <label htmlFor="department" className="font-medium">
                            학과
                        </label>
                        <input
                            name="department"
                            id="department"
                            className="border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                            placeholder="ex) OOO학과"
                        />
                    </div>
                    <div className="container mx-auto mb-5">
                        <label htmlFor="contact" className="font-medium">
                            연락처
                        </label>
                        <input
                            name="contact"
                            id="contact"
                            className="border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                            placeholder="ex) 01012345678 (-없이)"
                        />
                    </div>
                    <div className="container mx-auto mb-5">
                        <label htmlFor="email" className="font-medium">
                            이메일
                        </label>
                        <input
                            name="email"
                            id="email"
                            className="border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                            typeof="email"
                            placeholder="ex) abc1234@kduniv.ac.kr"
                        />
                    </div>
                    <div className="container mx-auto mb-5">
                        <label htmlFor="pw" className="font-medium">
                            비밀번호
                        </label>
                        <input
                            name="pw"
                            id="pw"
                            className="border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                            typeof="password"
                            placeholder="6자 이상"
                        />
                    </div>
                    {/* <div className="max-w-md container mx-auto mb-8">
                        <label htmlFor="passcard_picture" className="font-medium">
                            출입증 사진
                        </label>
                        <input
                            name="passcard_picture"
                            id="passcard_picture"
                            className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 transition ease-in-out hover:scale-105 px-2"
                            typeof="file"
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

export default RegisterPage;
