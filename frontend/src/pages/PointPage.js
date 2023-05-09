import { useEffect, useState } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import SidebarContainer from '../containers/SidebarContainer';
import axios from 'axios';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

const PointPage = () => {
    const [selectedStudent, setSelectedStudent] = useState('학생을 선택하세요');
    const [studentOptions, setStudentOptions] = useState([]);
    const [isBonusButtonClicked, setIsBonusButtonClicked] = useState(false);
    const [isPenaltyButtonClicked, setIsPenaltyButtonClicked] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    let selectOptions = [];

    const fetchStudentList = async () => {
        const res = await axios.get('http://localhost:4000/students/list', { withCredentials: true });
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
            selectOptions[i] = {
                value: res.data[i].student_id,
                label: res.data[i].student_name + ' ' + res.data[i].student_id,
            };
        }
        selectOptions.sort((a, b) => {
            if (a.value < b.value) {
                return -1;
            }
            if (a.value > b.value) {
                return 1;
            }
            return 0;
        });
        setStudentOptions(selectOptions);
    };

    useEffect(() => {
        fetchStudentList();
    }, []);

    const onBonusPointSubmit = async (data) => {
        try {
            const res = await axios.put(
                'http://localhost:4000/students/bonusPoint',
                {
                    score_reason: data.score_reason,
                    bonusPoint: data.bonusPoint,
                    student_id: selectedStudent.value,
                },
                { withCredentials: true }
            );
            alert('상점 부여가 완료되었습니다.');
        } catch (err) {
            console.log(err);
        }
    };

    const onPenaltyPointSubmit = async (data) => {
        try {
            const res = await axios.put(
                'http://localhost:4000/students/penaltyPoint',
                {
                    score_reason: data.score_reason,
                    penalty_point: data.penaltyPoint,
                    student_id: selectedStudent.value,
                },
                { withCredentials: true }
            );
            alert('벌점 부여가 완료되었습니다.');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <HeaderContainer></HeaderContainer>
            <div className="flex bg-white pt-16">
                <SidebarContainer></SidebarContainer>
                <div id="main-content" className="h-full w-full bg-gray-100 relative lg:ml-64">
                    <main>
                        <div className="py-6 px-4">
                            <div className="w-full gap-4">
                                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                                    {/* 카드 */}
                                    <h1 className="text-lg font-medium text-gray-900">상벌점 부여</h1>
                                    <Select
                                        options={studentOptions}
                                        onChange={setSelectedStudent}
                                        placeholder="학생을 선택하세요"
                                    />
                                    <div className="flex justify-between md:mx-40 my-5">
                                        <button
                                            onClick={() => {
                                                setIsBonusButtonClicked(!isBonusButtonClicked);
                                            }}
                                            className="shadow-md h-9 w-20 bg-blue-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-blue-700 transition ease-in-out hover:scale-110"
                                        >
                                            상점
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsPenaltyButtonClicked(!isPenaltyButtonClicked);
                                            }}
                                            className="shadow-md h-9 w-20 bg-red-500 justify-center self-center text-base font-medium text-white rounded-3xl inline-flex items-center p-2 hover:bg-red-700 transition ease-in-out hover:scale-110"
                                        >
                                            벌점
                                        </button>
                                    </div>
                                    {isBonusButtonClicked && (
                                        <form method="put" onSubmit={handleSubmit(onBonusPointSubmit)}>
                                            <input
                                                {...register('bonusPoint', {
                                                    required: {
                                                        value: true,
                                                        message: '점수를 입력하세요',
                                                    },
                                                })}
                                                id="bonusPoint"
                                                className={
                                                    errors.bonusPoint
                                                        ? 'border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2'
                                                        : 'border border-black container mx-auto rounded-xl shadow-md h-10 px-2'
                                                }
                                                placeholder="점수를 입력하세요"
                                                type="number"
                                            />
                                            {errors.bonusPoint && (
                                                <h1 className="text-red-500">{errors.bonusPoint.message}</h1>
                                            )}
                                            <input
                                                {...register('score_reason', {
                                                    required: {
                                                        value: true,
                                                        message: '상점 부여 사유를 입력하세요',
                                                    },
                                                })}
                                                id="score_reason"
                                                className={
                                                    errors.score_reason
                                                        ? 'border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2'
                                                        : 'border border-black container mx-auto rounded-xl shadow-md h-10 px-2'
                                                }
                                                placeholder="상점 부여 사유를 입력하세요"
                                            />
                                            {errors.score_reason && (
                                                <h1 className="text-red-500">{errors.score_reason.message}</h1>
                                            )}
                                            <button className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex">
                                                제출
                                            </button>
                                        </form>
                                    )}
                                    {isPenaltyButtonClicked && (
                                        <form method="put" onSubmit={handleSubmit(onPenaltyPointSubmit)}>
                                            <input
                                                {...register('penaltyPoint', {
                                                    required: {
                                                        value: true,
                                                        message: '점수를 입력하세요',
                                                    },
                                                })}
                                                id="penaltyPoint"
                                                className={
                                                    errors.penaltyPoint
                                                        ? 'border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2'
                                                        : 'border border-black container mx-auto rounded-xl shadow-md h-10 px-2'
                                                }
                                                placeholder="점수를 입력하세요"
                                                type="number"
                                            />
                                            {errors.penaltyPoint && (
                                                <h1 className="text-red-500">{errors.penaltyPoint.message}</h1>
                                            )}
                                            <input
                                                {...register('score_reason', {
                                                    required: {
                                                        value: true,
                                                        message: '벌점 부여 사유를 입력하세요',
                                                    },
                                                })}
                                                id="score_reason"
                                                className={
                                                    errors.score_reason
                                                        ? 'border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2'
                                                        : 'border border-black container mx-auto rounded-xl shadow-md h-10 px-2'
                                                }
                                                placeholder="벌점 부여 사유를 입력하세요"
                                            />
                                            {errors.score_reason && (
                                                <h1 className="text-red-500">{errors.score_reason.message}</h1>
                                            )}
                                            <button className="shadow-md rounded-3xl h-[35px] w-[85px] bg-red-500 items-center justify-center self-center text-base font-medium text-white hover:bg-red-700 mx-auto transition ease-in-out hover:scale-110 flex">
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

export default PointPage;
