import { Helmet } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NoticePage from "./pages/NoticePage";
import SignupPage from "./pages/SignupPage";
import SinchungCheckPage from "./pages/SinchungCheckPage";
import SinchungPage from "./pages/SinchungPage";
import MainPage from "./pages/MainPage";
import SignupCheckPage from "./pages/SignUpCheckPage";
import { RecoilRoot } from "recoil";
import PointPage from "./pages/PointPage";
import RollCallPage from "./pages/RollCallPage";
import StatisticsPage from "./pages/StatisticsPage";
import RollCallRecordPage from "./pages/RollCallRecordPage";
import StudentListPage from "./pages/StudentListPage";

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
        <Route path="/sinchung" element={<SinchungPage />} />
        <Route path="/sinchungCheck/:id" element={<SinchungCheckPage />} />
        <Route path="/signupRequestCheck/:id" element={<SignupCheckPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/managePoint" element={<PointPage />} />
        <Route path="/rollCall" element={<RollCallPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/rollCallRecord" element={<RollCallRecordPage />} />
        <Route path="/studentList" element={<StudentListPage />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
