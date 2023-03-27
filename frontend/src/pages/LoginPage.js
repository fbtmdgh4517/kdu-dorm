import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <>
            <Link
                className="text-center my-20 w-[360px] mx-auto text-3xl font-bold flex items-center justify-center self-center"
                to="/"
            >
                경동대학교 기숙사 외박신청
            </Link>
            <div className="border border-blue-200 w-[360px] mx-auto rounded-xl shadow-md p-8 bg-white mb-4">
                <form>
                    <div className="max-w-md container mx-auto mb-8">
                        <label htmlFor="id" className="font-medium">
                            아이디
                        </label>
                        <input
                            name="id"
                            id="id"
                            className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 transition ease-in-out hover:scale-105 px-2"
                        />
                    </div>
                    <div className="max-w-md container mx-auto mb-8">
                        <label htmlFor="pw" className="font-medium">
                            비밀번호
                        </label>
                        <input
                            name="pw"
                            id="pw"
                            className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 transition ease-in-out hover:scale-105 px-2"
                            typeof="password"
                        />
                    </div>
                    <button className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex">
                        로그인
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
