import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WeekDiet = () => {
    const [todayDate, setTodayDate] = useState();
    const [todayBreakfast, setTodayBreakfast] = useState();
    const [todayDinner, setTodayDinner] = useState();

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:4000/weekDiet', {
                headers: {},
            });
            setTodayDate(res.data[0].todayDate);
            setTodayBreakfast(res.data[0].todayBreakfast);
            setTodayDinner(res.data[0].todayDinner);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Link
                className="text-center my-20 w-[360px] mx-auto text-3xl font-bold flex items-center justify-center self-center"
                to="/"
            >
                경동대학교 기숙사 외박신청
            </Link>
            <div className="border border-blue-200 max-w-sm w-11/12 mx-auto rounded-xl shadow-md p-8 bg-white mb-4">
                {todayDate && todayBreakfast && todayDinner ? (
                    <>
                        <p className="text-xl font-medium">기숙사 식단</p>
                        <p className="text-xl font-medium">{todayDate}</p>
                        <br></br>
                        <div className="flex justify-between">
                            <div className="space-x-3">
                                <p className="text-xl font-medium">아침</p>
                                {todayBreakfast[0] !== '' ? (
                                    todayBreakfast.map((meal) => (
                                        <p className="text-xl font-medium" key={meal}>
                                            {meal}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-xl font-medium">식단이 없습니다.</p>
                                )}
                            </div>
                        </div>
                        <br></br>
                        <div className="flex justify-between">
                            <div className="space-x-3">
                                <p className="text-xl font-medium">저녁</p>
                                {todayDinner[0] !== '' ? (
                                    todayDinner.map((meal) => (
                                        <p className="text-xl font-medium" key={meal}>
                                            {meal}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-xl font-medium">식단이 없습니다.</p>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-xl font-medium">로딩중</p>
                )}
            </div>
        </>
    );
};

export default WeekDiet;
