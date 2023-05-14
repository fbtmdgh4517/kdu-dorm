import { useEffect } from "react";
import { useState } from "react";
import TodayDiet from "../components/TodayMenu";
import axios from "axios";

const TodayMenuContainer = () => {
    const [todayDate, setTodayDate] = useState();
    const [todayBreakfast, setTodayBreakfast] = useState();
    const [todayDinner, setTodayDinner] = useState();

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:4000/weekDiet", {
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

    return <TodayDiet todayDate={todayDate} todayBreakfast={todayBreakfast} todayDinner={todayDinner} />;
};

export default TodayMenuContainer;
