import Pagination from "react-js-pagination";

const NoticeListPreview = ({ notice, page, pageChangeHandler, offset }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold leading-none text-gray-900">기숙사 공지사항</h1>
      </div>
      <div className="p-3">
        {notice ? (
          <div className="overflow-x-auto rounded-lg border border-blue-500 shadow-md">
            <table className="table-auto w-full">
              <thead className="font-semibold text-gray-700 bg-blue-100">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold ">제목</div>
                  </th>
                  {/* <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold ">작성자</div>
                </th> */}
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold ">작성일</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {notice &&
                  notice.slice(offset, offset + 7).map((su) => {
                    return (
                      <tr key={su.seq} className="">
                        <td className="whitespace-nowrap hover:text-blue-600 pl-2 py-1">
                          <a
                            href={`https://metrodorm.kduniv.ac.kr/bbs/getBbsWriteView.kmc?seq=${su.seq}&bbs_locgbn=KY&bbs_id=notice`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {su.subject}
                          </a>
                        </td>
                        {/* <td className="whitespace-nowrap text-center">{su.regname}</td> */}
                        <td className="whitespace-nowrap text-center">{su.regdate}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">
            <svg
              role="status"
              className="inline h-8 w-8 animate-spin mr-2 text-gray-200 dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
      </div>
      {notice && (
        <div className="mx-auto items-center flex justify-center mt-3">
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
