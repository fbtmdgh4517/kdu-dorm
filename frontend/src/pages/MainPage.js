import { useEffect, useState } from "react";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { studentInfoSelector } from "../state";
import { useRecoilValueLoadable } from "recoil";
import { userAuthInfoSelector } from "../state";

const MainPage = () => {
    const userAuthInfo = useRecoilValueLoadable(userAuthInfoSelector);
    const refreshUserAuthInfo = useRecoilRefresher_UNSTABLE(userAuthInfoSelector);
    const refreshStudentInfo = useRecoilRefresher_UNSTABLE(studentInfoSelector);

    useEffect(() => {
        refreshUserAuthInfo();
        refreshStudentInfo();
        // console.log(userAuthInfo);
    }, []);

    switch (userAuthInfo.state) {
        case "loading":
            return <div>loading...</div>;
        case "hasError":
            return <div>error...</div>;
        default:
            if (userAuthInfo.contents.data.isLogin === "True" && userAuthInfo.contents.data.isAdmin) {
                return <AdminPage></AdminPage>;
            } else if (userAuthInfo.contents.data.isLogin === "True" && !userAuthInfo.contents.data.isAdmin) {
                return <UserPage></UserPage>;
            }
    }
};

export default MainPage;
