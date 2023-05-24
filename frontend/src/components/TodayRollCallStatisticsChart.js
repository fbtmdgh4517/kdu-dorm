import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const TodayRollCallStatisticsChart = ({ todayRollCallStatistics }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: todayRollCallStatistics.map((data) => data.id),
    datasets: [
      {
        label: "인원 수",
        data: todayRollCallStatistics.map((data) => data.value),
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default TodayRollCallStatisticsChart;
