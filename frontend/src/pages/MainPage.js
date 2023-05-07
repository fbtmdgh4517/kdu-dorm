import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminPage from './AdminPage';
import UserPage from './UserPage';
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import userAuthInfoState from '../state';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { userAuthInfoSelector } from '../state';

const { Link } = require('react-router-dom');

const MainPage = () => {
    const [user, setUser] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [admin, setAdmin] = useState('');
    // const [userAuthInfo, setUserAuthInfo] = useRecoilState(userAuthInfoState);
    const userAuthInfo = useRecoilValueLoadable(userAuthInfoSelector);
    // const userAuthInfo = useRecoilValue(userAuthInfoSelector);
    const refreshUserAuthInfo = useRecoilRefresher_UNSTABLE(userAuthInfoSelector);

    useEffect(() => {
        refreshUserAuthInfo();
        console.log(userAuthInfo);
        // console.log(userAuthInfo.data);
        // if (userAuthInfo.data.isLogin === 'False') {
        //     alert('로그인이 필요합니다.');
        //     window.location.href = '/';
        // }
        // if (userAuthInfo.isLogin === 'False') {
        //     alert('로그인이 필요합니다.');
        //     window.location.href = '/';
        // }
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
    }, []);

    const removeUserHandler = () => {
        setIsLogin(false);
    };

    switch (userAuthInfo.state) {
        case 'loading':
            return <div>loading...</div>;
        case 'hasError':
            return <div>error...</div>;
        default:
            console.log(userAuthInfo.contents);
            if (userAuthInfo.contents.data.isLogin === 'True' && userAuthInfo.contents.data.isAdmin) {
                return <AdminPage admin={admin} removeUserHandler={removeUserHandler}></AdminPage>;
            } else if (userAuthInfo.contents.data.isLogin === 'True' && !userAuthInfo.contents.data.isAdmin) {
                return <UserPage userName={user} removeUserHandler={removeUserHandler}></UserPage>;
            }
    }

    // if (userAuthInfo.data.isLogin === 'True' && userAuthInfo.data.isAdmin) {
    //     return <AdminPage admin={admin} removeUserHandler={removeUserHandler}></AdminPage>;
    // } else if (userAuthInfo.data.isLogin === 'True' && !userAuthInfo.data.isAdmin) {
    //     return <UserPage userName={user} removeUserHandler={removeUserHandler}></UserPage>;
    // }
    // if (userAuthInfo.isLogin === 'True' && userAuthInfo.isAdmin === 'True') {
    //     return <AdminPage admin={admin} removeUserHandler={removeUserHandler}></AdminPage>;
    // } else if (userAuthInfo.isLogin === 'False' && userAuthInfo.isAdmin === 'False') {
    //     return <UserPage userName={user} removeUserHandler={removeUserHandler}></UserPage>;
    // }
};

export default MainPage;
