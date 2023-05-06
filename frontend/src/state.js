import axios from 'axios';
import { selector } from 'recoil';

// const userAuthInfoState = {
//     key: 'userAuthInfoState',
//     default: {
//         isLogin: 'False',
//         isAdmin: false,
//         studentId: '',
//         studentName: '',
//     },
// }

const userAuthInfoSelector = selector({
    key: 'userAuthInfo',
    get: async () => {
        const { data } = await axios.get('http://localhost:4000/auth/authcheck', { withCredentials: true });

        return data;
    },
});

export default userAuthInfoSelector;
