import axios from 'axios';
import { atom, selector } from 'recoil';

export const userAuthInfoState = atom({
    key: 'userAuthInfoState',
    default: {
        isLogin: 'False',
        isAdmin: false,
        studentId: '',
        studentName: '',
    },
});

export const userAuthInfoSelector = selector({
    key: 'userAuthInfo',
    get: async () => {
        const data = await axios.get('http://localhost:4000/auth/authcheck', { withCredentials: true });
        return data;
    },
});
