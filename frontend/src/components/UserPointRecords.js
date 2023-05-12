import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

const UserPointRecords = () => {
    const [studentPointRecords, setStudentPointRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const offset = (page - 1) * limit;

    const fetchPointRecords = async () => {
        const res = await axios.get("http://localhost:4000/students/pointRecords", { withCredentials: true });
        console.log("상벌점 기록");
        console.log(res.data);
        setStudentPointRecords(res.data);
    };

    useEffect(() => {
        fetchPointRecords();
    }, []);

    const pageChangeHandler = (page) => {
        setPage(page);
    };

    return (
        <div className="bg-gray-100 border border-gray-300 text-center p-3 rounded-lg">
            {studentPointRecords.slice(offset, offset + limit).map((record) => {
                return (
                    <div key={record.record_id} className="flex m-3 justify-between">
                        <div>
                            <span className={record.score_type === "상점" ? "font-bold mr-1 text-blue-700" : "font-bold mr-1 text-red-500"}>
                                [{record.score_type}]
                            </span>
                            <span className="font-bold mr-3">{record.given_score}점</span>
                            <span>{record.score_reason}</span>
                        </div>
                        <div>
                            <span className="font-medium">{record.score_date.split("T")[0]}</span>
                        </div>
                    </div>
                );
            })}
            <div className="mx-auto items-center flex justify-center mt-6">
                <Pagination
                    innerClass="inline-flex items-center -space-x-px bg-white"
                    itemClassFirst="block px-3 py-2 ml-0 leading-tight border border-gray-300 rounded-l-lg"
                    itemClassLast="block px-3 py-2 leading-tight border border-gray-300 rounded-r-lg"
                    itemClass="block px-3 py-2 leading-tight border border-gray-300 cursor-pointer hover:bg-blue-500 hover:text-white"
                    activeClass="z-10 px-3 py-2 leading-tight bg-blue-500 text-white border border-blue-300"
                    activePage={page}
                    itemsCountPerPage={limit}
                    totalItemsCount={studentPointRecords.length}
                    pageRangeDisplayed={5}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={pageChangeHandler}
                />
            </div>
        </div>
    );
};

export default UserPointRecords;
