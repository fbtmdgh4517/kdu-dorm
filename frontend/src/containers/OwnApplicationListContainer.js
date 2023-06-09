import { useEffect, useState } from "react";
import UserApplicationList from "../components/UserApplicationList";
import axios from "axios";
import { userAuthInfoSelector } from "../state";
import { useRecoilValue } from "recoil";

const UserApplicationListContainer = () => {
  const [todayOutStudentList, setTodayOutStudentList] = useState([]);
  const [applicationInfo, setApplicationInfo] = useState([]);
  const [page, setPage] = useState(1);
  const userAuthInfo = useRecoilValue(userAuthInfoSelector);
  const offset = (page - 1) * 5;

  const fetchOwnApplicationList = async () => {
    await axios
      .get("/application/ownlist", { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        setApplicationInfo(
          res.data.sort((a, b) => {
            return new Date(b.application_time) - new Date(a.application_time);
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTodayOutStudentList = async () => {
    try {
      const res = await axios.get("/students/todayOutStudentList", { withCredentials: true });
      //res.data 배열에 있는 값들을 object로 변환
      // const todayOutStudentList2 = res.data.reduce((acc, cur) => {
      //   acc[cur.student_id] = cur;
      //   return acc;
      // }, {});
      setTodayOutStudentList(
        // res.data
        res.data.reduce((acc, cur) => {
          acc[cur.student_id] = cur;
          return acc;
        }, {})
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOwnApplicationList();
    fetchTodayOutStudentList();
  }, []);

  const pageChangeHandler = (page) => {
    setPage(page);
  };

  return (
    <UserApplicationList
      applicationInfo={applicationInfo}
      page={page}
      pageChangeHandler={pageChangeHandler}
      offset={offset}
      todayOutStudentList={todayOutStudentList}
      userAuthInfo={userAuthInfo.data}
    ></UserApplicationList>
  );
};

export default UserApplicationListContainer;
