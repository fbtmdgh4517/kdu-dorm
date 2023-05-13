import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

const PenaltyDangerStudentsList = () => {
    const [dangerStudentList, setDangerStudentList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const offset = (page - 1) * limit;

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:4000/students/penaltyDangerStudentsList", { withCredentials: true });
            setDangerStudentList(res.data);
        } catch (err) {
            console.log(err);
        }
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
                <h1 className="text-xl font-bold leading-none text-gray-900">벌점 위험 학생 목록</h1>
            </div>
            {dangerStudentList.slice(offset, offset + limit).map((student) => {
                return (
                    <div key={student.student_id} className="flex m-3 justify-between">
                        <div>
                            <span>
                                {student.student_id} {student.student_name} ({student.student_room}호)
                            </span>
                        </div>
                        <div>
                            <span>현재 벌점 : </span>
                            <span className="font-medium text-red-600">{student.penalty_point}점</span>
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
                    totalItemsCount={dangerStudentList.length}
                    pageRangeDisplayed={5}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={pageChangeHandler}
                />
            </div>
        </>
    );
};

export default PenaltyDangerStudentsList;
