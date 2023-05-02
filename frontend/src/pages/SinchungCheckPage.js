import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import HeaderContainer from '../containers/HeaderContainer';
import SidebarContainer from '../containers/SidebarContainer';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SinchungCheckPage = () => {
    //관리자가 체크하는 페이지
    const { id } = useParams();
    const [applicationInfo, setApplicationInfo] = useState();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState();

    const fetchData = async () => {
        // console.log(id);
        await axios
            .get(`http://localhost:4000/application/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data[0]);
                setApplicationInfo(res.data[0]);
                const applicationStartYear = new Date(applicationInfo.start_date).getFullYear();
                const applicationStartMonth = new Date(applicationInfo.start_date).getMonth() + 1;
                const applicationStartDate = new Date(applicationInfo.start_date).getDate();
                const applicationEndYear = new Date(applicationInfo.end_date).getFullYear();
                const applicationEndMonth = new Date(applicationInfo.end_date).getMonth() + 1;
                const applicationEndDate = new Date(applicationInfo.end_date).getDate();
                setStartDate(`${applicationStartYear}-${applicationStartMonth}-${applicationStartDate}`);
                setEndDate(`${applicationEndYear}-${applicationEndMonth}-${applicationEndDate}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                                        <h1 className="text-xl font-bold leading-none text-gray-900">외박신청</h1>
                                    </div>
                                    <div className="container mx-auto mb-5">
                                        <h1 className="font-medium">외박 시작일</h1>
                                        <span>{startDate}</span>
                                    </div>
                                    <div className="container mx-auto mb-5">
                                        <h1 className="font-medium">외박 종료일</h1>
                                        <span>{endDate}</span>
                                    </div>
                                    <div className="container mx-auto mb-5">
                                        <h1 className="font-medium">외박 사유</h1>
                                        <span>{applicationInfo.application_reason}</span>
                                    </div>
                                    <div className="flex justify-between mx-40">
                                        <button className="shadow-md h-[35px] w-[85px] bg-blue-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-blue-700 transition ease-in-out hover:scale-110">
                                            수락
                                        </button>
                                        <button className="shadow-md h-[35px] w-[85px] bg-red-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-red-700 transition ease-in-out hover:scale-110">
                                            거절
                                        </button>
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

export default SinchungCheckPage;
