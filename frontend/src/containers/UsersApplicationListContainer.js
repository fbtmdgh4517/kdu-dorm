import { useEffect, useState } from "react";
import ApplicationListPreview from "../components/ApplicaionListPreview";
import axios from "axios";

const UsersApplicationListContainer = () => {
  const [applicationInfo, setApplicationInfo] = useState([]);
  const [noCheckedCount, setNoCheckedCount] = useState(0);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 5;

  const fetchData = async () => {
    try {
      const res = await axios.get("/application/list", { withCredentials: true });
      const noCheckedCount = res.data.filter((data) => data.approval_status === "미확인").length;

      setApplicationInfo(res.data);
      setNoCheckedCount(noCheckedCount);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pageChangeHandler = (page) => {
    setPage(page);
  };
  return (
    <ApplicationListPreview
      applicationInfo={applicationInfo}
      page={page}
      pageChangeHandler={pageChangeHandler}
      offset={offset}
      noCheckedCount={noCheckedCount}
    />
  );
};

export default UsersApplicationListContainer;
