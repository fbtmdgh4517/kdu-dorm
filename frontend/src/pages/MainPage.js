import { useEffect } from "react";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { studentInfoSelector, studentListSelector } from "../state";
import { useRecoilValueLoadable } from "recoil";
import { userAuthInfoSelector } from "../state";

const MainPage = () => {
  const userAuthInfo = useRecoilValueLoadable(userAuthInfoSelector);
  const refreshUserAuthInfo = useRecoilRefresher_UNSTABLE(userAuthInfoSelector);
  const refreshStudentInfo = useRecoilRefresher_UNSTABLE(studentInfoSelector);
  const refreshStudentList = useRecoilRefresher_UNSTABLE(studentListSelector);

  useEffect(() => {
    refreshUserAuthInfo();
    refreshStudentInfo();
    refreshStudentList();
    // console.log(userAuthInfo);
  }, []);

  return (
    <>
      {userAuthInfo.state === "hasValue" && userAuthInfo.contents.data.isLogin === "True" && userAuthInfo.contents.data.isAdmin && <AdminPage></AdminPage>}
      {userAuthInfo.state === "hasValue" && userAuthInfo.contents.data.isLogin === "True" && !userAuthInfo.contents.data.isAdmin && <UserPage></UserPage>}
    </>
  );
};

export default MainPage;
