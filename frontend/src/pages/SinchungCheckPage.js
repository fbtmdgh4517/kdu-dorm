import { Link } from 'react-router-dom';

const SinchungCheckPage = () => {
    return (
        <>
            <Link
                className="text-center my-20 w-[360px] mx-auto text-3xl font-bold flex items-center justify-center self-center"
                to="/"
            >
                경동대학교 기숙사 외박신청
            </Link>
            <div className="border border-blue-200 container max-w-[360px] mx-auto rounded-xl shadow-md p-4 bg-white mb-4">
                <h1 className="font-semibold mb-4">외박 신청</h1>
                <form>
                    <div className="max-w-md container mx-auto mb-4">
                        <label htmlFor="room_num" className="font-medium">
                            호실
                        </label>
                        <input
                            name="room_num"
                            id="room_num"
                            className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 px-2"
                            value="6432"
                        />
                    </div>
                    <div className="max-w-md container mx-auto mb-4">
                        <label htmlFor="date" className="font-medium">
                            외박 기간
                        </label>
                        <input
                            name="date"
                            id="date"
                            className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 px-2 text-gray-400"
                            type="datetime-local"
                        />
                        ~
                        <input
                            name="date"
                            id="date"
                            className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 px-2 text-gray-400"
                            type="datetime-local"
                        />
                    </div>
                    <div className="max-w-md container mx-auto mb-4">
                        <label htmlFor="reason" className="font-medium">
                            외박 사유
                        </label>
                        <input
                            name="reason"
                            id="reason"
                            className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-20 px-2 overflow-auto"
                            value="aaaaaaaaaaaaaaaaaaaaaaaa"
                        />
                    </div>
                    <button className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex">
                        신청
                    </button>
                </form>
            </div>
        </>
    );
};

export default SinchungCheckPage;
