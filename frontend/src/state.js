import axios from "axios";
import { atom, selector } from "recoil";

export const userAuthInfoState = atom({
    key: "userAuthInfoState",
    default: {
        isLogin: "False",
        isAdmin: false,
        studentId: "",
        studentName: "",
    },
});

export const studentIdState = atom({
    key: "studentIdState",
    default: 0,
});

export const userAuthInfoSelector = selector({
    key: "userAuthInfo",
    get: async () => {
        const data = await axios.get("http://localhost:4000/auth/authcheck", { withCredentials: true });
        return data;
    },
});

export const studentListSelector = selector({
    key: "studentList",
    get: async () => {
        const res = await axios.get("http://localhost:4000/students/list", { withCredentials: true });
        return res;
    },
});

export const studentInfoSelector = selector({
    key: "studentInfo",
    get: async () => {
        const res = await axios.get("http://localhost:4000/students/studentInfo", { withCredentials: true });
        return res.data[0];
    },
});

export const studentInfoSelectorById = selector({
    key: "studentInfoById",
    get: async ({ get }) => {
        const studentId = get(studentIdState);
        const res = await axios.get(`http://localhost:4000/students/studentInfo/${studentId}`, { withCredentials: true });
        return res.data[0];
    },
});
