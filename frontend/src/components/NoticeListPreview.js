import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

const NoticeListPreview = () => {
    const [notice, setNotice] = useState();
    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:4000/notice', {
                headers: {},
            });
            //res.data.root[0].list 배열과 res.data.root[0].topList 배열을 합치고 배열의 regdate를 기준으로 내림차순 정렬
            console.log(res.data.root[0].list.concat(res.data.root[0].topList).sort((a, b) => b.seq - a.seq));

            // console.log(res.data.root[0].list.concat(res.data.root[0].topList));
            setNotice(res.data.root[0].list.concat(res.data.root[0].topList).sort((a, b) => b.seq - a.seq));
        } catch (e) {
            console.log(e);
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
            {
                //notice가 있을 때 각 notice 배열의 subject를 출력
                notice &&
                    notice.slice(offset, offset + limit).map((su) => {
                        return (
                            //새창으로 링크를 여는 코드
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
                    })
            }
            <div className="mx-auto items-center flex justify-center mt-6">
                <Pagination
                    innerClass="inline-flex items-center -space-x-px"
                    itemClassFirst="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                    itemClassLast="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                    itemClass="px-3 py-2 leading-tight border border-gray-300"
                    activeClass="z-10 px-3 py-2 leading-tight bg-blue-500 text-white border border-blue-300"
                    activePage={page}
                    itemsCountPerPage={limit}
                    totalItemsCount={notice && notice.length}
                    pageRangeDisplayed={5}
                    prevPageText={'<'}
                    nextPageText={'>'}
                    onChange={pageChangeHandler}
                />
            </div>
        </>
    );
};

export default NoticeListPreview;
