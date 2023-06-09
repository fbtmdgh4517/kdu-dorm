import { useEffect, useState } from "react";
import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import axios from "axios";
import TodayRollCallStatisticsChart from "../components/TodayRollCallStatisticsChart";
import TodayApplicationStatisticsChart from "../components/TodayApplicationStatisticsChart";
import TodayPointStatisticsChart from "../components/TodayPointStatisticsChart";
import TodayRollCallCompareChart from "../components/TodayRollCallCompareChart";
import TodayApplicationCompareChart from "../components/TodayApplicationCompareChart";
import RollCallStatisticsChart from "../components/RollCallStatisticsChart";
import ApplicationStatisticsChart from "../components/ApplicationStatisticsChart";
import PointStatisticsChart from "../components/PointStatisticsChart";
import WeeklyRollCallCompareChart from "../components/WeeklyRollCallCompareChart";
import WeeklyApplicationCompareChart from "../components/WeeklyApplicationCompareChart";
import ByPeriodPointCompareChart from "../components/ByPeriodPointCompareChart";
import { useRecoilValueLoadable } from "recoil";
import { userAuthInfoSelector } from "../state";

const StatisticsPage = () => {
  const [todayStatistics, setTodayStatistics] = useState();
  const [todayApplicationStatistics, setTodayApplicationStatistics] = useState([]);
  const [todayRollCallStatistics, setTodayRollCallStatistics] = useState([]);
  const [todayPointStatistics, setTodayPointStatistics] = useState([]);

  const [rollcallCompareStatistics, setRollCallCompareStatistics] = useState([]);
  const [applicationCompareStatistics, setApplicationCompareStatistics] = useState([]);
  const [pointCompareStatistics, setPointCompareStatistics] = useState([]);

  const [rollCallStatistics, setRollCallStatistics] = useState([]);
  const [applicationStatistics, setApplicationStatistics] = useState([]);
  const [pointStatistics, setPointStatistics] = useState([]);

  const [compareDay, setCompareDay] = useState(1);
  const [selectedOption, setSelectedOption] = useState("일간");
  const userAuthInfo = useRecoilValueLoadable(userAuthInfoSelector);

  const fetchTodayStatistics = async () => {
    try {
      const res = await axios.get("/statistics/todayStatistics", { withCredentials: true });
      setTodayStatistics(res.data);
      setTodayApplicationStatistics(res.data.slice(1, 3));
      setTodayRollCallStatistics(res.data.slice(3, 6));
      setTodayPointStatistics(res.data.slice(6, 8));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCompareStatistics = async () => {
    try {
      const res = await axios.get(`/statistics/compareStatistics/${compareDay}`, { withCredentials: true });
      console.log(res.data);
      setRollCallCompareStatistics(res.data.rollCallCompareStatistics);
      setApplicationCompareStatistics(res.data.applicationCompareStatistics);
      setPointCompareStatistics(res.data.pointCompareStatistics);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStatistics = async () => {
    try {
      const res = await axios.get(`/statistics/statistics/${compareDay}`, { withCredentials: true });
      console.log(res.data);
      console.log(Object.keys(res.data.rollCallStatistics));
      setRollCallStatistics(res.data.rollCallStatistics);
      setApplicationStatistics(res.data.applicationStatistics);
      setPointStatistics(res.data.pointStatistics);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodayStatistics();
    fetchCompareStatistics();
  }, []);

  useEffect(() => {
    fetchStatistics();
    fetchCompareStatistics();
  }, [compareDay]);

  useEffect(() => {
    if (userAuthInfo.state === "hasValue" && userAuthInfo.contents.data.isLogin === "True" && userAuthInfo.contents.data.isAdmin === false) {
      alert("관리자만 접근 가능합니다.");
      window.location.href = "/main";
    }
  }, [userAuthInfo.state]);

  const onOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "일간") {
      setCompareDay(1);
    } else if (e.target.value === "주간") {
      setCompareDay(7);
    } else if (e.target.value === "월간") {
      setCompareDay(30);
    }
  };

  return (
    <>
      <HeaderContainer></HeaderContainer>
      <div className="flex overflow-hidden pt-16">
        <SidebarContainer></SidebarContainer>
        <div id="main-content" className="h-full w-full bg-blue-200 relative overflow-y-auto lg:ml-56">
          <main>
            <div className="py-9 px-4">
              <div className="w-full gap-4">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                  {/* 카드 */}
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold leading-none text-gray-900">통계</h1>
                  </div>
                  <div className="text-center">
                    <select
                      className="shadow-md rounded-3xl h-[40px] w-32 bg-black items-center text-base font-medium text-white text-center mb-4"
                      onChange={onOptionChange}
                    >
                      {/* <option value="">통계 종류 선택</option> */}
                      <option value="일간">일간 통계</option>
                      <option value="주간">주간 통계</option>
                      <option value="월간">월간 통계</option>
                    </select>
                  </div>
                  {todayRollCallStatistics &&
                    todayApplicationStatistics &&
                    todayPointStatistics &&
                    rollcallCompareStatistics &&
                    applicationCompareStatistics &&
                    selectedOption === "일간" && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">점호 통계</h1>
                            </div>
                            {!todayRollCallStatistics.some((stat) => stat.value) ? (
                              <div className="text-center">
                                <span className="font-bold text-xl">오늘 점호 통계가 아직 없습니다.</span>
                              </div>
                            ) : (
                              <TodayRollCallStatisticsChart todayRollCallStatistics={todayRollCallStatistics} />
                            )}
                          </div>
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6 col-span-2 hidden md:inline-block">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">점호 통계 그래프</h1>
                            </div>
                            <TodayRollCallCompareChart todayRollCallCompareStatistics={rollcallCompareStatistics} />
                          </div>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">외박 신청 통계</h1>
                            </div>
                            {!todayApplicationStatistics.some((stat) => stat.value) ? (
                              <div className="text-center">
                                <span className="font-bold text-xl">오늘 외박 신청 통계가 아직 없습니다.</span>
                              </div>
                            ) : (
                              <TodayApplicationStatisticsChart todayApplicationStatistics={todayApplicationStatistics} />
                            )}
                          </div>
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6 col-span-2 hidden md:inline-block">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">외박신청 통계 그래프</h1>
                            </div>
                            <TodayApplicationCompareChart todayApplicationCompareStatistics={applicationCompareStatistics} />
                          </div>
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">상벌점 통계</h1>
                            </div>
                            {!todayPointStatistics.some((stat) => stat.value) ? (
                              <div className="text-center">
                                <span className="font-bold text-xl">오늘 상벌점 통계가 아직 없습니다.</span>
                              </div>
                            ) : (
                              <TodayPointStatisticsChart todayPointStatistics={todayPointStatistics} />
                            )}
                          </div>
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6 col-span-2 hidden md:inline-block">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">상벌점 통계 그래프</h1>
                            </div>
                            <ByPeriodPointCompareChart
                              pointCompareStatistics={pointCompareStatistics}
                              period={compareDay}
                              titleText="일간 상벌점 통계 그래프"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  {rollCallStatistics &&
                    applicationStatistics &&
                    todayPointStatistics &&
                    rollcallCompareStatistics &&
                    applicationCompareStatistics &&
                    selectedOption === "주간" && (
                      <>
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">점호 통계</h1>
                            </div>
                            {!Object.values(rollCallStatistics).some((stat) => stat.value) ? (
                              <div className="text-center">
                                <span className="font-bold text-xl">오늘 점호 통계가 아직 없습니다.</span>
                              </div>
                            ) : (
                              <RollCallStatisticsChart rollCallStatistics={rollCallStatistics} />
                            )}
                          </div>
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6 col-span-2 hidden md:inline-block">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">점호 통계 그래프</h1>
                            </div>
                            <WeeklyRollCallCompareChart
                              weeklyRollCallCompareStatistics={rollcallCompareStatistics}
                              period={compareDay}
                              titleText="주간 점호 통계 그래프"
                            />
                          </div>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">외박 신청 통계</h1>
                            </div>
                            <ApplicationStatisticsChart applicationStatistics={applicationStatistics} />
                          </div>
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6 col-span-2 hidden md:inline-block">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">외박신청 통계 그래프</h1>
                            </div>
                            <WeeklyApplicationCompareChart
                              weeklyApplicationCompareStatistics={applicationCompareStatistics}
                              period={compareDay}
                              titleText="주간 외박신청 통계 그래프"
                            />
                          </div>
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">상벌점 통계</h1>
                            </div>
                            <PointStatisticsChart pointStatistics={pointStatistics} />
                          </div>
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6 col-span-2 hidden md:inline-block">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">상벌점 통계 그래프</h1>
                            </div>
                            <ByPeriodPointCompareChart
                              pointCompareStatistics={pointCompareStatistics}
                              period={compareDay}
                              titleText="주간 상벌점 통계 그래프"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  {rollCallStatistics &&
                    applicationStatistics &&
                    todayPointStatistics &&
                    rollcallCompareStatistics &&
                    applicationCompareStatistics &&
                    selectedOption === "월간" && (
                      <>
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">점호 통계</h1>
                            </div>
                            {!Object.values(rollCallStatistics).some((stat) => stat.value) ? (
                              <div className="text-center">
                                <span className="font-bold text-xl">오늘 점호 통계가 아직 없습니다.</span>
                              </div>
                            ) : (
                              <RollCallStatisticsChart rollCallStatistics={rollCallStatistics} />
                            )}
                          </div>
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6 col-span-2 hidden md:inline-block">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">점호 통계 그래프</h1>
                            </div>
                            <WeeklyRollCallCompareChart
                              weeklyRollCallCompareStatistics={rollcallCompareStatistics}
                              period={compareDay}
                              titleText="월간 점호 통계 그래프"
                            />
                          </div>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">외박 신청 통계</h1>
                            </div>
                            <div className="text-center">
                              <span className="font-bold text-xl">오늘 외박 신청 통계가 아직 없습니다.</span>
                            </div>
                            <ApplicationStatisticsChart applicationStatistics={applicationStatistics} />
                          </div>
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6 col-span-2 hidden md:inline-block">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">외박신청 통계 그래프</h1>
                            </div>
                            <WeeklyApplicationCompareChart
                              weeklyApplicationCompareStatistics={applicationCompareStatistics}
                              period={compareDay}
                              titleText="월간 외박신청 통계 그래프"
                            />
                          </div>
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">상벌점 통계</h1>
                            </div>
                            <PointStatisticsChart pointStatistics={pointStatistics} />
                          </div>
                          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6 col-span-2 hidden md:inline-block">
                            {/* 카드 */}
                            <div className="flex items-center justify-between mb-4">
                              <h1 className="text-xl font-bold leading-none text-gray-900">상벌점 통계 그래프</h1>
                            </div>
                            <ByPeriodPointCompareChart
                              pointCompareStatistics={pointCompareStatistics}
                              period={compareDay}
                              titleText="월간 상벌점 통계 그래프"
                            />
                          </div>
                        </div>
                      </>
                    )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default StatisticsPage;
