import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const UserApplicationList = ({ applicationInfo, page, pageChangeHandler, offset, todayOutStudentList, userAuthInfo }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold leading-none text-gray-900">외박 신청 목록</h1>
        {/* {todayOutStudentList.filter(
          (student) =>
            student.student_id === userAuthInfo.data.studentId && (
              <Link
                to="/sinchung"
                className="shadow-md h-[35px] w-[85px] bg-blue-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-blue-700 transition ease-in-out hover:scale-110"
              >
                외박신청
              </Link>
            )
        )} */}
        {todayOutStudentList[userAuthInfo.studentId] ? (
          <input
            type="text"
            className="shadow-md text-center h-[35px] w-[85px] bg-green-600 text-base font-medium text-white rounded-3xl inline-flex items-center p-2"
            value="외박 중"
            readOnly
          ></input>
        ) : (
          <Link
            to="/sinchung"
            className="shadow-md h-[35px] w-[85px] bg-blue-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-blue-700 transition ease-in-out hover:scale-110"
          >
            외박신청
          </Link>
        )}
      </div>
      <div className="px-3">
        <div className="overflow-x-auto rounded-lg border border-blue-500 shadow-md">
          <table className="table-auto w-full">
            <thead className="font-semibold text-gray-700 bg-blue-100">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold ">신청</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold ">상태</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applicationInfo.slice(offset, offset + 7).map((application) => {
                const applicationYear = new Date(application.application_time).getFullYear();
                const applicationMonth = new Date(application.application_time).getMonth() + 1;
                const applicationDate = new Date(application.application_time).getDate();
                return (
                  <tr key={application.application_id} className="max-w-md container mx-auto mb-4">
                    <td className="whitespace-nowrap hover:text-blue-600 pl-2 py-1">
                      <Link to={`/sinchungCheck/${application.application_id}`}>
                        {`${applicationYear}년 ${applicationMonth}월 ${applicationDate}일 외박 신청`}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap hover:text-blue-600 text-center">
                      <span
                        className={
                          application.approval_status === "승인"
                            ? "text-blue-700 font-bold"
                            : application.approval_status === "거부"
                            ? "text-red-600 font-bold"
                            : application.approval_status === "미확인" && "text-gray-600 font-bold"
                        }
                      >
                        {application.approval_status}
                      </span>
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
          innerClass="inline-flex items-center -space-x-px"
          itemClassFirst="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
          itemClassLast="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
          itemClass="px-3 py-2 leading-tight border border-gray-300"
          activeClass="z-10 px-3 py-2 leading-tight bg-blue-500 text-white border border-blue-300"
          activePage={page}
          itemsCountPerPage={5}
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
