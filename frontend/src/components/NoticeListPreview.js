import Pagination from "react-js-pagination";

const NoticeListPreview = ({ notice, page, pageChangeHandler, offset }) => {
    return (
        <>
            {notice &&
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
                })}
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
