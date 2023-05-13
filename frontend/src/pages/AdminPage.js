import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NoticeListPreview from "../components/NoticeListPreview";
import TodayDiet from "../components/TodayDiet";
import axios from "axios";
import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import SignupRequestListPreview from "../components/SignupRequestListPreview";
import ApplicationListPreview from "../components/ApplicaionListPreview";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { studentListSelector } from "../state";
import PenaltyDangerStudentsList from "../components/PenaltyDangerStudentsList";

const AdminPage = ({ removeUserHandler, admin }) => {
    const navigate = useNavigate();

    console.log("관리자 페이지임");

    const onLogout = async () => {
        await axios.get("http://localhost:4000/auth/logout", { withCredentials: true }).then((res) => {});
        removeUserHandler();
        navigate("/");
    };

    return (
        <>
            <HeaderContainer></HeaderContainer>
            <div className="flex overflow-hidden bg-white pt-16">
                <SidebarContainer></SidebarContainer>
                <div id="main-content" className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64">
                    <main>
                        <div className="py-6 px-4">
                            <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4">
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                                    {/* 카드 */}
                                    <ApplicationListPreview></ApplicationListPreview>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                                    {/* 카드 */}
                                    <SignupRequestListPreview></SignupRequestListPreview>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 h-full">
                                    {/* 카드 */}
                                    <TodayDiet></TodayDiet>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                                    {/* 카드 */}
                                    <NoticeListPreview></NoticeListPreview>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                                    {/* 카드 */}
                                    <PenaltyDangerStudentsList></PenaltyDangerStudentsList>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
