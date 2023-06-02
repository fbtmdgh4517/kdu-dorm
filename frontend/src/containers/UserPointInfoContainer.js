import { useRecoilValueLoadable } from "recoil";
import { studentInfoSelector } from "../state";
import UserCurrentPoint from "../components/UserCurrentPoint";
import UserPointRecords from "../components/UserPointRecords";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const UserPointInfoContainer = () => {
  const studentInfo = useRecoilValueLoadable(studentInfoSelector);
  const [studentPointRecords, setStudentPointRecords] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 5;

  const fetchPointRecords = async () => {
    const res = await axios.get("/students/pointRecords", { withCredentials: true });
    console.log("상벌점 기록");
    // console.log(res.data);
    setStudentPointRecords(res.data);
  };

  useEffect(() => {
    fetchPointRecords();
  }, []);

  const pageChangeHandler = (page) => {
    setPage(page);
  };

  return (
    <>
      <UserCurrentPoint studentInfo={studentInfo}></UserCurrentPoint>
      <br></br>
      <UserPointRecords studentPointRecords={studentPointRecords} pageChangeHandler={pageChangeHandler} page={page} offset={offset}></UserPointRecords>
    </>
  );
};

export default UserPointInfoContainer;
