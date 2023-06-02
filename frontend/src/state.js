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
    const data = await axios.get("/auth/authcheck", { withCredentials: true });
    return data;
  },
});

export const studentListSelector = selector({
  key: "studentList",
  get: async () => {
    const res = await axios.get("/students/list", { withCredentials: true });
    return res;
  },
});

//세션에 있는 학번으로 찾는거
export const studentInfoSelector = selector({
  key: "studentInfo",
  get: async () => {
    const res = await axios.get("/students/studentInfo", { withCredentials: true });
    return res.data[0];
  },
});

//직접 찾는 학번으로 찾는거
export const studentInfoSelectorById = selector({
  key: "studentInfoById",
  get: async ({ get }) => {
    const studentId = get(studentIdState);
    const res = await axios.get(`/students/studentInfo/${studentId}`, { withCredentials: true });
    return res.data[0];
  },
});
