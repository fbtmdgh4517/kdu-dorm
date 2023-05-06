import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useRecoilValue } from 'recoil';
import userAuthInfoSelector from '../state';

const HeaderContainer = () => {
    const [user, setUser] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [admin, setAdmin] = useState('');
    const userAuthInfo = useRecoilValue(userAuthInfoSelector);

    console.log('ㄹrecoil');
    console.log(userAuthInfo);

    useEffect(() => {
        if (userAuthInfo.isLogin === 'False') {
            alert('로그인이 필요합니다.');
            window.location.href = '/';
        }
        // axios.get('http://localhost:4000/auth/authcheck', { withCredentials: true }).then((res) => {
        //     // console.log(res.data);
        //     if (res.data.isLogin === 'True') {
        //         if (res.data.isAdmin === true) {
        //             setUser(res.data.studentId);
        //             setIsLogin(true);
        //         } else {
        //             setUser(res.data.studentName);
        //             setIsLogin(true);
        //         }
        //     } else {
        //         alert('로그인이 필요합니다.');
        //         window.location.href = '/';
        //     }
        // });
    }, [isLogin]);

    return <Header userName={userAuthInfo.studentId}></Header>;
};

export default HeaderContainer;
