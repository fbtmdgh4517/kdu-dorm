import { Link } from 'react-router-dom';

const ManagerPage = () => {
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
                    <Link className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 px-2 items-center grid grid-cols-10">
                        <p className="col-span-9">몇월 몇일 외박 신청</p>
                        <p className="col-span-1 font-semibold text-green-600">승인</p>
                    </Link>
                </div>
                <div className="max-w-md container mx-auto mb-4">
                    <Link className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 px-2 items-center grid grid-cols-10">
                        <p className="col-span-9">몇월 몇일 외박 신청</p>
                        <p className="col-span-1 font-semibold text-green-600">승인</p>
                    </Link>
                </div>
                <div className="max-w-md container mx-auto mb-4">
                    <Link className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 px-2 items-center grid grid-cols-10">
                        <p className="col-span-9">몇월 몇일 외박 신청</p>
                        <p className="col-span-1 font-semibold text-green-600">승인</p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ManagerPage;
