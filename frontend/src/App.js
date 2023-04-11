import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ManagerPage from './pages/ManagerPage';
import NoticePage from './pages/NoticePage';
import SignupPage from './pages/SignupPage';
import SinchungCheckPage from './pages/SinchungCheckPage';
import SinchungPage from './pages/SinchungPage';
import UserPage from './pages/UserPage';
import WeekDiet from './pages/WeekDiet';

function App() {
    return (
        <>
            <Helmet>
                <title>경동대학교 메트로폴캠퍼스 기숙사</title>
            </Helmet>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/userMain" element={<UserPage />} />
                <Route path="/sinchung" element={<SinchungPage />} />
                <Route path="/managerMain" element={<ManagerPage />} />
                <Route path="/sinchungCheck" element={<SinchungCheckPage />} />
                <Route path="/weekDiet" element={<WeekDiet />} />
                <Route path="/notice" element={<NoticePage />} />
            </Routes>
        </>
    );
}

export default App;
