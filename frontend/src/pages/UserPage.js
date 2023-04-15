import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NoticeListPreview from '../components/NoticeListPreview';
import TodayDiet from '../components/TodayDiet';

const UserPage = ({ userName, removeUserHandler }) => {
    const [name, setName] = useState('');
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const navigate = useNavigate();
    const [applicationInfo, setApplicationInfo] = useState([]);

    const fetchData = async () => {
        await axios
            .get('http://localhost:4000/application/list', { withCredentials: true })
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
        // navigate('/');
    };

    const onSideBarToggle = () => {
        document.getElementById('sidebar').classList.toggle('hidden');
        document.getElementById('toggleSidebarMobile').classList.toggle('bg-gray-100');
        document.getElementById('toggleSidebarMobileHamburger').classList.toggle('hidden');
        document.getElementById('toggleSidebarMobileClose').classList.toggle('hidden');
    };

    return (
        <>
            <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
                <div className="px-3 py-5 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                id="toggleSidebarMobile"
                                aria-expanded="true"
                                aria-controls="sidebar"
                                onClick={onSideBarToggle}
                                className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                            >
                                <svg
                                    id="toggleSidebarMobileHamburger"
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <svg
                                    id="toggleSidebarMobileClose"
                                    className="w-6 h-6 hidden"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <Link className="text-xl font-bold flex items-center lg:ml-2.5" to="/">
                                경동대학교 기숙사 외박신청
                            </Link>
                        </div>
                        <div className="flex items-center">{userName}</div>
                    </div>
                </div>
            </nav>
            <div className="flex overflow-hidden bg-white pt-16">
                <aside
                    id="sidebar"
                    className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-[width] duration-75"
                    aria-label="Sidebar"
                >
                    <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-300 bg-white pt-0">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex-1 px-3 bg-white divide-y space-y-1">
                                <ul className="space-y-2 pb-2">
                                    <li>
                                        <button
                                            onClick={onLogout}
                                            className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                                        >
                                            <span className="ml-3">로그아웃</span>
                                        </button>
                                    </li>
                                    {/* <li>
                                        <Link className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                                            <span className="ml-3">회원가입</span>
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
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
                                    <div className="bg-gray-100 border border-gray-300 text-center p-4">
                                        <span className="font-bold">{userName}</span>
                                        <span> 의 상벌점</span>
                                        <div className="flex flex-row mt-8">
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
