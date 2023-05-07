import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoticeListPreview from '../components/NoticeListPreview';
import TodayDiet from '../components/TodayDiet';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import HeaderContainer from '../containers/HeaderContainer';
import SidebarContainer from '../containers/SidebarContainer';
import { useRecoilValue } from 'recoil';
import { userAuthInfoSelector } from '../state';

const UserPage = ({ userName, removeUserHandler }) => {
    const [name, setName] = useState('');
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const navigate = useNavigate();
    const [applicationInfo, setApplicationInfo] = useState([]);
    const userAuthInfo = useRecoilValue(userAuthInfoSelector);

    const fetchData = async () => {
        await axios
            .get('http://localhost:4000/application/ownlist', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setApplicationInfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onLogout = async () => {
        await axios.get('http://localhost:4000/auth/logout', { withCredentials: true }).then((res) => {});
        removeUserHandler();
        navigate('/');
    };

    return (
        <>
            <HeaderContainer></HeaderContainer>
            <div className="flex overflow-hidden bg-white pt-16">
                <SidebarContainer></SidebarContainer>
                <div id="main-content" className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64">
                    <main>
                        <div className="py-6 px-4">
                            <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                                    {/* 카드 */}
                                    <div className="flex items-center justify-between mb-4">
                                        <h1 className="text-xl font-bold leading-none text-gray-900">외박 신청 목록</h1>
                                        <Link
                                            to="/sinchung"
                                            className="shadow-md h-[35px] w-[85px] bg-blue-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-blue-700 transition ease-in-out hover:scale-110"
                                        >
                                            외박신청
                                        </Link>
                                    </div>
                                    {applicationInfo.map((application) => {
                                        const applicationYear = new Date(application.application_time).getFullYear();
                                        const applicationMonth = new Date(application.application_time).getMonth() + 1;
                                        const applicationDate = new Date(application.application_time).getDate();
                                        return (
                                            <div
                                                key={application.application_id}
                                                className="max-w-md container mx-auto mb-4"
                                            >
                                                <Link className="border border-black max-w-md container mx-auto rounded-xl shadow-md h-10 px-2 flex items-center">
                                                    {`${applicationYear}년 ${applicationMonth}월 ${applicationDate}일 외박 신청`}
                                                </Link>
                                            </div>
                                        );
                                    })}
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
                                    <div className="flex items-center justify-between mb-4">
                                        <h1 className="text-xl font-bold leading-none text-gray-900">상벌점 조회</h1>
                                    </div>
                                    <div className="bg-gray-100 border border-gray-300 text-center p-3 rounded-lg">
                                        <span className="font-bold">{userAuthInfo.studentName}</span>
                                        <span> 의 상벌점</span>
                                        <div className="flex flex-row mt-16">
                                            <div className="w-1/2 py-2">
                                                <span>상점 :</span>
                                                <span>2</span>
                                            </div>
                                            <div className="w-1/2 py-2">
                                                <span>벌점 :</span>
                                                <span>2</span>
                                            </div>
                                        </div>
                                    </div>
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
