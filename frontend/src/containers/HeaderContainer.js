import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useRecoilValue } from "recoil";
import { userAuthInfoSelector } from "../state";

const HeaderContainer = () => {
    const [user, setUser] = useState("");
    const userAuthInfo = useRecoilValue(userAuthInfoSelector);

    useEffect(() => {
        if (userAuthInfo.data.isLogin === "False") {
            alert("로그인이 필요합니다.");
            window.location.href = "/";
        }
        if (userAuthInfo.data.isAdmin) {
            setUser(userAuthInfo.data.studentId);
        } else if (!userAuthInfo.data.isAdmin) {
            setUser(userAuthInfo.data.studentName);
        }
    }, []);

    const onSideBarToggle = () => {
        document.getElementById("sidebar").classList.toggle("hidden");
        document.getElementById("toggleSidebarMobile").classList.toggle("bg-gray-100");
        document.getElementById("toggleSidebarMobileHamburger").classList.toggle("hidden");
        document.getElementById("toggleSidebarMobileClose").classList.toggle("hidden");
    };

    return <Header userName={user} onSideBarToggle={onSideBarToggle}></Header>;
};

export default HeaderContainer;
