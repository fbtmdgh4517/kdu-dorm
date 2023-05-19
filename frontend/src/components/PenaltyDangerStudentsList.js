import Pagination from "react-js-pagination";

const PenaltyDangerStudentsList = ({ dangerStudentList, page, pageChangeHandler, offset }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold leading-none text-gray-900">벌점 위험 학생 목록</h1>
      </div>
      <div className="p-3">
        <div className="overflow-x-auto rounded-lg border border-blue-500 shadow-md">
          <table className="table-auto w-full">
            <thead className="font-semibold text-gray-700 bg-blue-100">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold ">학생</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold ">호실</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold ">현재 벌점</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-center">
              {dangerStudentList.slice(offset, offset + 5).map((student) => {
                return (
                  <tr key={student.student_id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="">
                        <div className="font-medium text-gray-800">
                          {student.student_id} {student.student_name}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">{student.student_room}호</td>
                    <td className="p-2 whitespace-nowrap">
                      <span className="font-medium text-red-600">{student.penalty_point}점</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mx-auto items-center flex justify-center mt-6">
        <Pagination
          innerClass="inline-flex items-center -space-x-px bg-white"
          itemClassFirst="block px-3 py-2 ml-0 leading-tight border border-gray-300 rounded-l-lg"
          itemClassLast="block px-3 py-2 leading-tight border border-gray-300 rounded-r-lg"
          itemClass="block px-3 py-2 leading-tight border border-gray-300 cursor-pointer hover:bg-blue-500 hover:text-white"
          activeClass="z-10 px-3 py-2 leading-tight bg-blue-500 text-white border border-blue-300"
          activePage={page}
          itemsCountPerPage={5}
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
