import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PointStatisticsChart = ({ pointStatistics }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: Object.keys(pointStatistics),
    datasets: [
      {
        label: "인원 수",
        data: Object.values(pointStatistics),
        backgroundColor: ["rgba(255, 206, 86, 0.2)", "rgba(153, 102, 255, 0.2)"],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PointStatisticsChart;
