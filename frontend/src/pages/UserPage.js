import { Link } from 'react-router-dom';

const UserPage = () => {
    return (
        <>
            <Link
                className="text-center my-20 w-[360px] mx-auto text-3xl font-bold flex items-center justify-center self-center"
                to="/"
            >
                경동대학교 기숙사 외박신청
            </Link>
            <div className="border border-blue-200 container max-w-[360px] mx-auto rounded-xl shadow-md p-4 bg-white mb-4">
                <h1 className="font-semibold mb-4">외박 신청 목록</h1>
                <div className="max-w-md container mx-auto mb-4">
                    <Link className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 px-2 flex items-center">
                        몇월 몇일 외박 신청
                    </Link>
                </div>
                <div className="max-w-md container mx-auto mb-4">
                    <Link className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 px-2 flex items-center">
                        몇월 몇일 외박 신청
                    </Link>
                </div>
                <div className="max-w-md container mx-auto mb-4">
                    <Link className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 px-2 flex items-center">
                        몇월 몇일 외박 신청
                    </Link>
                </div>
                <button className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex">
                    외박신청
                </button>
            </div>
        </>
    );
};

export default UserPage;
