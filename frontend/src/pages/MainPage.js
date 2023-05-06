import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminPage from './AdminPage';
import UserPage from './UserPage';
import { useRecoilValue } from 'recoil';
import userAuthInfoSelector from '../state';

const { Link } = require('react-router-dom');

const MainPage = () => {
    const [user, setUser] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [admin, setAdmin] = useState('');
    const userAuthInfo = useRecoilValue(userAuthInfoSelector);

    useEffect(() => {
        if (!userAuthInfo.isLogin) {
            alert('로그인이 필요합니다.');
            window.location.href = '/';
        }
        // axios.get('http://localhost:4000/auth/authcheck', { withCredentials: true }).then((res) => {
        //     console.log(res.data);
        //     if (res.data.isLogin === 'True') {
        //         if (res.data.isAdmin === true) {
        //             setAdmin(res.data.studentId);
        //             setIsLogin(true);
        //             setIsAdmin(true);
        //         } else {
        //             setUser(res.data.studentName);
        //             setIsAdmin(false);
        //             setIsLogin(true);
        //         }
        //     } else {
        //         alert('로그인이 필요합니다.');
        //         window.location.href = '/';
        //     }
        // });
    }, [userAuthInfo.isLogin]);

    const removeUserHandler = () => {
        setIsLogin(false);
    };

    if (userAuthInfo.isLogin === 'True' && userAuthInfo.isAdmin) {
        return <AdminPage admin={admin} removeUserHandler={removeUserHandler}></AdminPage>;
    } else if (userAuthInfo.isLogin === 'True' && !userAuthInfo.isAdmin) {
        return <UserPage userName={user} removeUserHandler={removeUserHandler}></UserPage>;
    }
};

export default MainPage;
