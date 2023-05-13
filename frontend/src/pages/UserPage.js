import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NoticeListPreview from "../components/NoticeListPreview";
import TodayDiet from "../components/TodayDiet";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import { useRecoilValue } from "recoil";
import { userAuthInfoSelector } from "../state";
import Pagination from "react-js-pagination";
import UserApplicationList from "../components/UserApplicationList";
import UserCurrentPoint from "../components/UserCurrentPoint";
import UserPointRecords from "../components/UserPointRecords";

const UserPage = ({ userName, removeUserHandler }) => {
    const navigate = useNavigate();

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
                                    <UserApplicationList></UserApplicationList>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                                    {/* 카드 */}
                                    <NoticeListPreview></NoticeListPreview>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                                <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                                    {/* 카드 */}
                                    <TodayDiet></TodayDiet>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                                    {/* 카드 */}
                                    <UserCurrentPoint></UserCurrentPoint>
                                    <br></br>
                                    <UserPointRecords></UserPointRecords>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default UserPage;
