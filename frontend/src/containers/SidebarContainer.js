import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const SidebarContainer = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const onLogout = async () => {
        await axios.get('http://localhost:4000/auth/logout', { withCredentials: true }).then((res) => {});
        setIsLogin(false);
        navigate('/');
    };

    return <Sidebar onLogout={onLogout}></Sidebar>;
};

export default SidebarContainer;
