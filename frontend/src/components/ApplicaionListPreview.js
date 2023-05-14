import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const ApplicationListPreview = ({ applicationInfo, page, pageChangeHandler, offset }) => {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold leading-none text-gray-900">외박 신청 목록</h1>
            </div>
            {applicationInfo.slice(offset, offset + 5).map((application) => {
                const applicationYear = new Date(application.application_time).getFullYear();
                const applicationMonth = new Date(application.application_time).getMonth() + 1;
                const applicationDate = new Date(application.application_time).getDate();
                return (
                    <div key={application.application_id} className="max-w-md container mx-auto mb-4">
                        <Link
                            to={`/sinchungCheck/${application.application_id}`}
                            className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 px-2 flex items-center justify-between"
                        >
                            <span>{`${application.student_name}의 ${applicationYear}년 ${applicationMonth}월 ${applicationDate}일 외박 신청`}</span>
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

export default ApplicationListPreview;
