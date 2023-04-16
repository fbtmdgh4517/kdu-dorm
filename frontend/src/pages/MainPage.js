import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminPage from './AdminPage';
import UserPage from './UserPage';

const { Link } = require('react-router-dom');

const MainPage = () => {
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
                    setAdmin(res.data.studentId);
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

    console.log(isLogin);
    console.log(isAdmin);

    const removeUserHandler = () => {
        // setUser('');
        setIsLogin(false);
    };

    if (isLogin && isAdmin) {
        return <AdminPage admin={admin} removeUserHandler={removeUserHandler}></AdminPage>;
    } else if (isLogin && !isAdmin) {
        return <UserPage userName={user} removeUserHandler={removeUserHandler}></UserPage>;
    }
};

export default MainPage;
