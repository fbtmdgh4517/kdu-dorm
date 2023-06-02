import { useEffect, useState } from "react";
import NoticeListPreview from "../components/NoticeListPreview";
import axios from "axios";

const NoticeListContainer = () => {
  const [notice, setNotice] = useState();
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 8;

  const fetchData = async () => {
    try {
      const res = await axios.get("/notice");
      setNotice(res.data);
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
