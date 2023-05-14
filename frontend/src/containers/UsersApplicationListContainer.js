import { useEffect, useState } from "react";
import ApplicationListPreview from "../components/ApplicaionListPreview";
import axios from "axios";

const UsersApplicationListContainer = () => {
    const [applicationInfo, setApplicationInfo] = useState([]);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 5;

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:4000/application/list", { withCredentials: true });
            setApplicationInfo(
                res.data.sort((a, b) => {
                    return new Date(b.application_time) - new Date(a.application_time);
                })
            );
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
    return <ApplicationListPreview applicationInfo={applicationInfo} page={page} pageChangeHandler={pageChangeHandler} offset={offset} />;
};

export default UsersApplicationListContainer;
