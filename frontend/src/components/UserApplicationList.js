import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const UserApplicationList = () => {
    const [applicationInfo, setApplicationInfo] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const offset = (page - 1) * limit;

    const fetchData = async () => {
        await axios
            .get("http://localhost:4000/application/ownlist", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setApplicationInfo(
                    res.data.sort((a, b) => {
                        return new Date(b.application_time) - new Date(a.application_time);
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const pageChangeHandler = (page) => {
        setPage(page);
    };

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold leading-none text-gray-900">외박 신청 목록</h1>
                <Link
                    to="/sinchung"
                    className="shadow-md h-[35px] w-[85px] bg-blue-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-blue-700 transition ease-in-out hover:scale-110"
                >
                    외박신청
                </Link>
            </div>
            {applicationInfo.slice(offset, offset + limit).map((application) => {
                const applicationYear = new Date(application.application_time).getFullYear();
                const applicationMonth = new Date(application.application_time).getMonth() + 1;
                const applicationDate = new Date(application.application_time).getDate();
                return (
                    <div key={application.application_id} className="max-w-md container mx-auto mb-4">
                        <Link
                            to={`/sinchungCheck/${application.application_id}`}
                            className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 px-2 flex items-center justify-between"
                        >
                            {`${applicationYear}년 ${applicationMonth}월 ${applicationDate}일 외박 신청`}
                            <span className="text-blue-700 font-bold">{application.approval_status}</span>
                        </Link>
                    </div>
                );
            })}
            <div className="mx-auto items-center flex justify-center mt-6">
                <Pagination
                    innerClass="inline-flex items-center -space-x-px"
                    itemClassFirst="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                    itemClassLast="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                    itemClass="px-3 py-2 leading-tight border border-gray-300"
                    activeClass="z-10 px-3 py-2 leading-tight bg-blue-500 text-white border border-blue-300"
                    activePage={page}
                    itemsCountPerPage={limit}
                    totalItemsCount={applicationInfo.length}
                    pageRangeDisplayed={5}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={pageChangeHandler}
                />
            </div>
        </>
    );
};

export default UserApplicationList;
