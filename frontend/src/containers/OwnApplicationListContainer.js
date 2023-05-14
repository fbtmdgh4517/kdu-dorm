import { useEffect, useState } from "react";
import UserApplicationList from "../components/UserApplicationList";
import axios from "axios";

const UserApplicationListContainer = () => {
    const [applicationInfo, setApplicationInfo] = useState([]);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 5;

    const fetchData = async () => {
        await axios
            .get("http://localhost:4000/application/ownlist", { withCredentials: true })
            .then((res) => {
                // console.log(res.data);
                setApplicationInfo(
                    res.data.sort((a, b) => {
                        return new Date(b.application_time) - new Date(a.application_time);
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const pageChangeHandler = (page) => {
        setPage(page);
    };

    return <UserApplicationList applicationInfo={applicationInfo} page={page} pageChangeHandler={pageChangeHandler} offset={offset}></UserApplicationList>;
};

export default UserApplicationListContainer;
