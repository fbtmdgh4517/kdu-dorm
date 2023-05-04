import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';
import SidebarContainer from '../containers/SidebarContainer';

const SignupCheckPage = () => {
    const { id } = useParams();
    const [signupRequestInfo, setSignupRequestInfo] = useState({});

    const fetchData = async () => {
        await axios
            .get(`http://localhost:4000/auth/signupRequest/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data[0]);
                setSignupRequestInfo(res.data[0]);
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
                                        <h1 className="text-xl font-bold leading-none text-gray-900">회원가입 신청</h1>
                                    </div>
                                    <div className="container mx-auto mb-5">
                                        <h1 className="font-medium">학번</h1>
                                        <span>{signupRequestInfo.student_id}</span>
                                    </div>
                                    <div className="container mx-auto mb-5">
                                        <h1 className="font-medium">학과</h1>
                                        <span>{signupRequestInfo.student_department}</span>
                                    </div>
                                    <div className="container mx-auto mb-5">
                                        <h1 className="font-medium">이름</h1>
                                        <span>{signupRequestInfo.student_name}</span>
                                    </div>
                                    <div className="container mx-auto mb-5">
                                        <h1 className="font-medium">연락처</h1>
                                        <span>{signupRequestInfo.student_contact}</span>
                                    </div>
                                    <div className="container mx-auto mb-5">
                                        <h1 className="font-medium">호실</h1>
                                        <span>{signupRequestInfo.student_room}</span>
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

export default SignupCheckPage;
