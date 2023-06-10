import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const SignupRequestListPreview = ({ signupRequests, page, pageChangeHandler, offset, noCheckedCount }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold leading-none text-gray-900">회원가입 신청 목록</h1>
        <div className="flex items-center">
          <span className="text-base font-semibold text-gray-500">미확인 회원가입 신청 : </span>
          <span className="ml-2 text-base text-red-600 font-bold">{noCheckedCount}개</span>
        </div>
      </div>
      <div className="p-3">
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
              {signupRequests.slice(offset, offset + 7).map((request) => {
                return (
                  <tr key={request.request_id} className="max-w-md container mx-auto mb-4">
                    <td className="whitespace-nowrap hover:text-blue-600 pl-2 py-1">
                      <Link to={`/signupRequestCheck/${request.request_id}`}>
                        <span>{`${request.student_id} ${request.student_name}의 회원가입 신청`}</span>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap hover:text-blue-600 text-center">
                      <span
                        className={
                          request.request_status === "승인"
                            ? "text-blue-700 font-bold"
                            : request.request_status === "거부"
                            ? "text-red-600 font-bold"
                            : request.request_status === "미확인" && "text-gray-600 font-bold"
                        }
                      >
                        {request.request_status}
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
          totalItemsCount={signupRequests.length}
          pageRangeDisplayed={5}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={pageChangeHandler}
        />
      </div>
    </>
  );
};

export default SignupRequestListPreview;
