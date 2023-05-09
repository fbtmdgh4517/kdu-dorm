import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import HeaderContainer from '../containers/HeaderContainer';
import SidebarContainer from '../containers/SidebarContainer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const SinchungCheckPage = () => {
    //관리자가 체크하는 페이지
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [applicationInfo, setApplicationInfo] = useState({});
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isRefused, setIsRefused] = useState(false);

    const fetchData = async () => {
        // console.log(id);
        await axios
            .get(`http://localhost:4000/application/detail/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setApplicationInfo(res.data[0]);
                const applicationStartYear = new Date(res.data[0].start_date).getFullYear();
                const applicationStartMonth = new Date(res.data[0].start_date).getMonth() + 1;
                const applicationStartDate = new Date(res.data[0].start_date).getDate();
                const applicationEndYear = new Date(res.data[0].end_date).getFullYear();
                const applicationEndMonth = new Date(res.data[0].end_date).getMonth() + 1;
                const applicationEndDate = new Date(res.data[0].end_date).getDate();
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

    const onAcceptApplication = async () => {
        await axios
            .put(`http://localhost:4000/application/accept/${id}`, { withCredentials: true })
            .then((res) => {
                alert('외박 신청 승인이 완료되었습니다.');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onRefuseApplication = async (data) => {
        await axios
            .put(
                `http://localhost:4000/application/refuse/${id}`,
                {
                    rejection_reason: data.rejection_reason,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                alert('외박 신청 거부가 완료되었습니다.');
            })
            .catch((err) => {
                console.log(err);
            });
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
                                    <div className="flex justify-between  md:mx-40 my-5">
                                        <button
                                            onClick={onAcceptApplication}
                                            className="shadow-md h-9 w-20 bg-blue-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-blue-700 transition ease-in-out hover:scale-110"
                                        >
                                            수락
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsRefused(true);
                                            }}
                                            className="shadow-md h-9 w-20 bg-red-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-red-700 transition ease-in-out hover:scale-110"
                                        >
                                            거절
                                        </button>
                                    </div>
                                    {isRefused && (
                                        <form method="put" onSubmit={handleSubmit(onRefuseApplication)}>
                                            <input
                                                {...register('rejection_reason', {
                                                    required: {
                                                        value: true,
                                                        message: '거부 사유를 입력하세요',
                                                    },
                                                })}
                                                id="rejection_reason"
                                                className={
                                                    errors.rejection_reason
                                                        ? 'border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2'
                                                        : 'border border-black container mx-auto rounded-xl shadow-md h-10 px-2'
                                                }
                                                // className="border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                                                placeholder="거부 사유를 입력하세요"
                                            />
                                            {errors.rejection_reason && (
                                                <span className="text-red-500">{errors.rejection_reason.message}</span>
                                            )}
                                            <button className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex">
                                                제출
                                            </button>
                                        </form>
                                    )}
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
