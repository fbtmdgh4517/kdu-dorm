import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useRecoilValue } from "recoil";
import { userAuthInfoSelector } from "../state";

const SidebarContainer = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const userAuthInfo = useRecoilValue(userAuthInfoSelector);

    const onLogout = async () => {
        await axios.get("http://localhost:4000/auth/logout", { withCredentials: true }).then((res) => {});
        setIsLogin(false);
        navigate("/");
    };

    return <Sidebar onLogout={onLogout} userAuthInfo={userAuthInfo}></Sidebar>;
};

export default SidebarContainer;
