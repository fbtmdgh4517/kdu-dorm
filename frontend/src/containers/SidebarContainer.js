import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { userAuthInfoSelector } from "../state";

const SidebarContainer = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const userAuthInfo = useRecoilValue(userAuthInfoSelector);
  const refreshUserAuthInfo = useRecoilRefresher_UNSTABLE(userAuthInfoSelector);

  const onLogout = async () => {
    await axios.get("/auth/logout", { withCredentials: true }).then((res) => {
      setIsLogin(false);
      refreshUserAuthInfo();
      navigate("/");
    });
  };

  return <Sidebar onLogout={onLogout} userAuthInfo={userAuthInfo}></Sidebar>;
};

export default SidebarContainer;
