import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

const HeaderContainer = () => {
    const [user, setUser] = useState('');
    const [studentId, setStudentId] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [admin, setAdmin] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/auth/authcheck', { withCredentials: true }).then((res) => {
            console.log(res.data);
            if (res.data.isLogin === 'True') {
                if (res.data.isAdmin === true) {
                    setUser(res.data.studentId);
                    setIsLogin(true);
                    setIsAdmin(true);
                } else {
                    setUser(res.data.studentName);
                    setStudentId(res.data.studentId);
                    setIsAdmin(false);
                    setIsLogin(true);
                }
            }
        });
    }, [isLogin]);

    return <Header userName={user}></Header>;
};

export default HeaderContainer;
