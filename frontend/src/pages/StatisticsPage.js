import { useEffect, useState } from "react";
import HeaderContainer from "../containers/HeaderContainer";
import SidebarContainer from "../containers/SidebarContainer";
import axios from "axios";
import TodayRollCallStatisticsChart from "../components/TodayRollCallStatisticsChart";
import TodayApplicationStatisticsChart from "../components/TodayApplicationStatisticsChart";

const StatisticsPage = () => {
  const [todayStatistics, setTodayStatistics] = useState();
  const [todayApplicationStatistics, setTodayApplicationStatistics] = useState([]);
  const [todayRollCallStatistics, setTodayRollCallStatistics] = useState([]);
  const [selectedOption, setSelectedOption] = useState("일간");

  const fetchStatistics = async () => {
    try {
      const res = await axios.get("http://localhost:4000/statistics/todayStatistics", { withCredentials: true });
      console.log(res.data.slice(3, 6).map((data) => data.id));
      console.log(res.data.slice(3, 6));
      setTodayStatistics(res.data);
      // res.data의 0, 1, 2번째 인덱스에 있는 데이터를 todayApplicationStatistics에 저장
      setTodayApplicationStatistics(res.data.slice(1, 3));
      setTodayRollCallStatistics(res.data.slice(3, 6));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const onOptionChange = (e) => {
    setSelectedOption(e.target.value);
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
                      <option value="일간">일간 통계</option>
                      <option value="주간">주간 통계</option>
                      <option value="월간">월간 통계</option>
                      <option value="날짜 직접 입력">날짜 직접 입력</option>
                    </select>
                  </div>
                  {selectedOption === "일간" && (
                    <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-4">
                      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6">
                        {/* 카드 */}
                        <TodayRollCallStatisticsChart todayRollCallStatistics={todayRollCallStatistics} />
                      </div>
                      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6">
                        {/* 카드 */}
                        <TodayApplicationStatisticsChart todayApplicationStatistics={todayApplicationStatistics} />
                      </div>
                      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-6">
                        {/* 카드 */}
                        {/* <TodayRollCallStatisticsChart /> */}
                      </div>
                    </div>
                  )}
                  {selectedOption === "주간" && <span>주간</span>}
                  {selectedOption === "월간" && <span>월간</span>}
                  {selectedOption === "날짜 직접 입력" && <span>날짜 직접 입력</span>}
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
