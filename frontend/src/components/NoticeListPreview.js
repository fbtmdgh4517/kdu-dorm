import Pagination from "react-js-pagination";

const NoticeListPreview = ({ notice, page, pageChangeHandler, offset }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold leading-none text-gray-900">기숙사 공지사항</h1>
      </div>
      <div className="p-3">
        <div className="overflow-x-auto rounded-lg border border-blue-500 shadow-md">
          <table className="table-auto w-full">
            <thead className="font-semibold text-gray-700 bg-blue-100">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold ">제목</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold ">작성자</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold ">작성일</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 pl-2">
              {notice &&
                notice.slice(offset, offset + 8).map((su) => {
                  return (
                    <div key={su.seq} className="">
                      <a
                        href={`https://metrodorm.kduniv.ac.kr/bbs/getBbsWriteView.kmc?seq=${su.seq}&bbs_locgbn=KY&bbs_id=notice`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {su.subject}
                      </a>
                    </div>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {/* {notice &&
                notice.slice(offset, offset + 8).map((su) => {
                    return (
                        <div key={su.seq}>
                            <a
                                href={`https://metrodorm.kduniv.ac.kr/bbs/getBbsWriteView.kmc?seq=${su.seq}&bbs_locgbn=KY&bbs_id=notice`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {su.subject}
                            </a>
                            <br></br>
                        </div>
                    );
                })} */}
      {notice && (
        <div className="mx-auto items-center flex justify-center mt-6">
          <Pagination
            innerClass="inline-flex items-center -space-x-px"
            itemClassFirst="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            itemClassLast="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            itemClass="px-3 py-2 leading-tight border border-gray-300"
            activeClass="z-10 px-3 py-2 leading-tight bg-blue-500 text-white border border-blue-300"
            activePage={page}
            itemsCountPerPage={8}
            totalItemsCount={notice.length}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={pageChangeHandler}
          />
        </div>
      )}
    </>
  );
};

export default NoticeListPreview;
