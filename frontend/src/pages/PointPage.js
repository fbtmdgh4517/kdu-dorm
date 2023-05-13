import { useEffect, useState } from "react";
import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import axios from "axios";
import Select from "react-select";
import { set, useForm } from "react-hook-form";
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable } from "recoil";
import { studentIdState, studentInfoSelectorById, studentListSelector } from "../state";

const PointPage = () => {
    const [selectedStudent, setSelectedStudent] = useState("학생을 선택하세요");
    const [studentOptions, setStudentOptions] = useState([]);
    const [isBonusButtonClicked, setIsBonusButtonClicked] = useState(false);
    const [isPenaltyButtonClicked, setIsPenaltyButtonClicked] = useState(false);
    const [studentId, setStudentId] = useRecoilState(studentIdState);
    const studentList = useRecoilValueLoadable(studentListSelector);
    const studentInfo = useRecoilValueLoadable(studentInfoSelectorById);
    const refreshStudentInfo = useRecoilRefresher_UNSTABLE(studentInfoSelectorById);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        console.log(studentList.contents.data);
        if (studentList.state === "hasValue") {
            setStudentOptions(
                studentList.contents.data.map((student) => {
                    return { value: student.student_id, label: `${student.student_name} ${student.student_id}` };
                })
            );
        }
    }, [studentList.state]);

    const onStudentSelect = (selectedStudent) => {
        setSelectedStudent(selectedStudent);
        setStudentId(selectedStudent.value);
    };

    const onBonusPointSubmit = async (data) => {
        try {
            const res = await axios.put(
                "http://localhost:4000/students/bonusPoint",
                {
                    score_reason: data.score_reason,
                    bonusPoint: data.bonusPoint,
                    student_id: selectedStudent.value,
                },
                { withCredentials: true }
            );
            setIsBonusButtonClicked(false);
            toggleBonusButton();
            refreshStudentInfo();
            alert("상점 부여가 완료되었습니다.");
        } catch (err) {
            console.log(err);
        }
    };

    const onPenaltyPointSubmit = async (data) => {
        try {
            const res = await axios.put(
                "http://localhost:4000/students/penaltyPoint",
                {
                    score_reason: data.score_reason,
                    penalty_point: data.penaltyPoint,
                    student_id: selectedStudent.value,
                },
                { withCredentials: true }
            );
            setIsPenaltyButtonClicked(false);
            refreshStudentInfo();
            alert("벌점 부여가 완료되었습니다.");
        } catch (err) {
            console.log(err);
        }
    };

    const toggleBonusButton = () => {
        setIsBonusButtonClicked(!isBonusButtonClicked);
    };

    const togglePenaltyButton = () => {
        setIsPenaltyButtonClicked(!isPenaltyButtonClicked);
    };

    console.log(studentOptions);

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
                                    <Select options={studentOptions} onChange={onStudentSelect} placeholder="학생을 선택하세요" className="my-3" />
                                    {selectedStudent !== "학생을 선택하세요" && (
                                        <div className="text-center">
                                            <div className="bg-gray-100 border border-gray-300 text-center p-3 rounded-lg">
                                                <span className="font-bold">
                                                    {studentInfo.contents.student_name} {studentInfo.contents.student_id}
                                                </span>
                                                <span> 의 현재 상벌점</span>
                                                <div className="flex flex-row mt-16">
                                                    <div className="w-1/2 py-2">
                                                        <span>상점 :</span>
                                                        <span className="text-blue-700 font-bold">{studentInfo.contents.bonus_point}</span>
                                                    </div>
                                                    <div className="w-1/2 py-2">
                                                        <span>벌점 :</span>
                                                        <span className="text-red-500 font-bold">{studentInfo.contents.penalty_point}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between md:mx-40 my-5">
                                        <button
                                            onClick={toggleBonusButton}
                                            className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex"
                                        >
                                            상점
                                        </button>
                                        <button
                                            onClick={togglePenaltyButton}
                                            className="shadow-md rounded-3xl h-[35px] w-[85px] bg-red-500 items-center justify-center self-center text-base font-medium text-white hover:bg-red-700 mx-auto transition ease-in-out hover:scale-110 flex"
                                        >
                                            벌점
                                        </button>
                                    </div>
                                    {isBonusButtonClicked && (
                                        <form method="put" onSubmit={handleSubmit(onBonusPointSubmit)}>
                                            <input
                                                {...register("bonusPoint", {
                                                    required: {
                                                        value: true,
                                                        message: "점수를 입력하세요",
                                                    },
                                                })}
                                                id="bonusPoint"
                                                className={
                                                    errors.bonusPoint
                                                        ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                                                        : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                                                }
                                                placeholder="점수를 입력하세요"
                                                type="number"
                                            />
                                            {errors.bonusPoint && <h1 className="text-red-500">{errors.bonusPoint.message}</h1>}
                                            <input
                                                {...register("score_reason", {
                                                    required: {
                                                        value: true,
                                                        message: "상점 부여 사유를 입력하세요",
                                                    },
                                                })}
                                                id="score_reason"
                                                className={
                                                    errors.score_reason
                                                        ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2"
                                                        : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2"
                                                }
                                                placeholder="상점 부여 사유를 입력하세요"
                                            />
                                            {errors.score_reason && <h1 className="text-red-500">{errors.score_reason.message}</h1>}
                                            <div className="flex justify-between md:mx-40 my-5">
                                                <button
                                                    type="submit"
                                                    className="shadow-md rounded-3xl h-[35px] w-[85px] bg-blue-500 items-center justify-center self-center text-base font-medium text-white hover:bg-blue-700 mx-auto transition ease-in-out hover:scale-110 flex"
                                                >
                                                    상점 부여
                                                </button>
                                                <button
                                                    onClick={toggleBonusButton}
                                                    className="shadow-md rounded-3xl h-[35px] w-[85px] bg-gray-500 items-center justify-center self-center text-base font-medium text-white hover:bg-gray-700 mx-auto transition ease-in-out hover:scale-110 flex"
                                                >
                                                    취소
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                    {isPenaltyButtonClicked && (
                                        <form method="put" onSubmit={handleSubmit(onPenaltyPointSubmit)}>
                                            <input
                                                {...register("penaltyPoint", {
                                                    required: {
                                                        value: true,
                                                        message: "점수를 입력하세요",
                                                    },
                                                })}
                                                id="penaltyPoint"
                                                className={
                                                    errors.penaltyPoint
                                                        ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2 my-2"
                                                        : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2 my-2"
                                                }
                                                placeholder="점수를 입력하세요"
                                                type="number"
                                            />
                                            {errors.penaltyPoint && <h1 className="text-red-500">{errors.penaltyPoint.message}</h1>}
                                            <input
                                                {...register("score_reason", {
                                                    required: {
                                                        value: true,
                                                        message: "벌점 부여 사유를 입력하세요",
                                                    },
                                                })}
                                                id="score_reason"
                                                className={
                                                    errors.score_reason
                                                        ? "border border-red-500 container mx-auto rounded-xl shadow-md h-10 px-2 my-2"
                                                        : "border border-black container mx-auto rounded-xl shadow-md h-10 px-2 my-2"
                                                }
                                                placeholder="벌점 부여 사유를 입력하세요"
                                            />
                                            {errors.score_reason && <h1 className="text-red-500">{errors.score_reason.message}</h1>}
                                            <div className="flex justify-between md:mx-40 my-5">
                                                <button
                                                    type="submit"
                                                    className="shadow-md rounded-3xl h-[35px] w-[85px] bg-red-500 items-center justify-center self-center text-base font-medium text-white hover:bg-red-700 mx-auto transition ease-in-out hover:scale-110 flex"
                                                >
                                                    벌점 부여
                                                </button>
                                                <button
                                                    onClick={togglePenaltyButton}
                                                    className="shadow-md rounded-3xl h-[35px] w-[85px] bg-gray-500 items-center justify-center self-center text-base font-medium text-white hover:bg-gray-700 mx-auto transition ease-in-out hover:scale-110 flex"
                                                >
                                                    취소
                                                </button>
                                            </div>
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
