import axios from "axios";
import PenaltyDangerStudentsList from "../components/PenaltyDangerStudentsList";
import { useEffect, useState } from "react";

const PenaltyDangerStudentsListContainer = () => {
    const [dangerStudentList, setDangerStudentList] = useState([]);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 5;

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:4000/students/penaltyDangerStudentsList", { withCredentials: true });
            setDangerStudentList(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const pageChangeHandler = (page) => {
        setPage(page);
    };

    return <PenaltyDangerStudentsList dangerStudentList={dangerStudentList} page={page} pageChangeHandler={pageChangeHandler} offset={offset} />;
};

export default PenaltyDangerStudentsListContainer;
