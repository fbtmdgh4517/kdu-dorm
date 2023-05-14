import { useEffect, useState } from "react";
import NoticeListPreview from "../components/NoticeListPreview";
import axios from "axios";

const NoticeListContainer = () => {
    const [notice, setNotice] = useState();
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 8;

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:4000/notice", {
                headers: {},
            });
            //res.data.root[0].list 배열과 res.data.root[0].topList 배열을 합치고 배열의 regdate를 기준으로 내림차순 정렬
            // console.log(res.data.root[0].list.concat(res.data.root[0].topList).sort((a, b) => b.seq - a.seq));

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

    return <NoticeListPreview notice={notice} page={page} pageChangeHandler={pageChangeHandler} offset={offset}></NoticeListPreview>;
};

export default NoticeListContainer;
