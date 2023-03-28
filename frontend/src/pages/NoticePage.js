import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NoticePage = () => {
    const [notice, setNotice] = useState();

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:4000/notice', {
                headers: {},
            });
            //res.data.root[0].list 배열과 res.data.root[0].topList 배열을 합치고 배열의 regdate를 기준으로 내림차순 정렬
            console.log(res.data.root[0].list.concat(res.data.root[0].topList).sort((a, b) => b.regdate - a.regdate));

            // console.log(res.data.root[0].list.concat(res.data.root[0].topList));
            setNotice(res.data.root[0].list.concat(res.data.root[0].topList).sort((a, b) => b.regdate - a.regdate));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Link
                className="text-center my-20 w-[360px] mx-auto text-3xl font-bold flex items-center justify-center self-center"
                to="/"
            >
                경동대학교 기숙사 외박신청
            </Link>
            <div className="border border-blue-200 max-w-sm w-11/12 mx-auto rounded-xl shadow-md p-8 bg-white mb-4"></div>
        </>
    );
};

export default NoticePage;
