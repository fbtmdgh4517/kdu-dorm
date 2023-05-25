import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const TodayApplicationStatisticsChart = ({ todayApplicationStatistics }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: todayApplicationStatistics.map((data) => data.id),
    datasets: [
      {
        label: "외박신청 수",
        data: todayApplicationStatistics.map((data) => data.value),
        backgroundColor: ["rgba(255, 206, 86, 0.2)", "rgba(153, 102, 255, 0.2)"],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default TodayApplicationStatisticsChart;
