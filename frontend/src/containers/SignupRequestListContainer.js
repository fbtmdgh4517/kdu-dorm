import axios from "axios";
import { useEffect, useState } from "react";
import SignupRequestListPreview from "../components/SignupRequestListPreview";

const SignupRequestListContainer = () => {
    const [signupRequests, setSignupRequests] = useState([]);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 5;

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:4000/auth/signupRequest", {
                withCredentials: true,
            });
            // console.log(res.data);
            setSignupRequests(res.data);
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

    return <SignupRequestListPreview signupRequests={signupRequests} page={page} pageChangeHandler={pageChangeHandler} offset={offset} />;
};

export default SignupRequestListContainer;
