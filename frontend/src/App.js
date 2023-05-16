import { Helmet } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import NoticePage from "./pages/NoticePage";
import SignupPage from "./pages/SignupPage";
import SinchungCheckPage from "./pages/SinchungCheckPage";
import SinchungPage from "./pages/SinchungPage";
import UserPage from "./pages/UserPage";
import MainPage from "./pages/MainPage";
import SignupCheckPage from "./pages/SignUpCheckPage";
import { RecoilRoot } from "recoil";
import PointPage from "./pages/PointPage";
import RollCallPage from "./pages/RollCallPage";

function App() {
    return (
        <RecoilRoot>
            <Helmet>
                <title>경동대학교 메트로폴캠퍼스 기숙사</title>
            </Helmet>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/userMain" element={<UserPage />} />
                <Route path="/sinchung" element={<SinchungPage />} />
                <Route path="/managerMain" element={<AdminPage />} />
                <Route path="/sinchungCheck/:id" element={<SinchungCheckPage />} />
                <Route path="/signupRequestCheck/:id" element={<SignupCheckPage />} />
                <Route path="/notice" element={<NoticePage />} />
                <Route path="/managePoint" element={<PointPage />} />
                <Route path="/rollCall" element={<RollCallPage />} />
            </Routes>
        </RecoilRoot>
    );
}

export default App;
