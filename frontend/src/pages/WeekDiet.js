import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WeekDiet = () => {
    const [mondayMeal, setMondayMeal] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/weekDiet', {
                    headers: {},
                });
                console.log(res.data);
            } catch (e) {
                console.log(e);
            }
        };
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
            <div className="border border-blue-200 max-w-sm w-11/12 mx-auto rounded-xl shadow-md p-8 bg-white mb-4"></div>
        </>
    );
};

export default WeekDiet;
