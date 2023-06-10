import axios from "axios";
import { useEffect, useState } from "react";
import SignupRequestListPreview from "../components/SignupRequestListPreview";

const SignupRequestListContainer = () => {
  const [signupRequests, setSignupRequests] = useState([]);
  const [noCheckedCount, setNoCheckedCount] = useState(0);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 5;

  const fetchData = async () => {
    try {
      const res = await axios.get("/auth/signupRequest", {
        withCredentials: true,
      });
      const noCheckedCount = res.data.filter((data) => data.request_status === "미확인").length;

      // console.log(res.data);
      setSignupRequests(res.data);
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
    <SignupRequestListPreview
      signupRequests={signupRequests}
      page={page}
      pageChangeHandler={pageChangeHandler}
      offset={offset}
      noCheckedCount={noCheckedCount}
    />
  );
};

export default SignupRequestListContainer;
