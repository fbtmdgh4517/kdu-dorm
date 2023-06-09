import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TodayPointCompareChart = ({ todayPointCompareStatistics }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "일간 외박신청 통계 그래프",
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // console.log(todayPointCompareStatistics);

  const groupedRecords = todayPointCompareStatistics.reduce((acc, cur) => {
    const date = new Date(cur.application_date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(cur);
    return acc;
  }, {});

  console.log(Object.keys(groupedRecords));
  console.log(Object.values(groupedRecords));

  const labels = Object.keys(groupedRecords);

  const data = {
    labels,
    datasets: [
      {
        label: "외박신청 승인 수",
        data: Object.values(groupedRecords).map((data) => {
          if (!data[0]) {
            return 0;
          } else {
            return data[0]["count(*)"];
          }
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "외박신청 거부 수",
        data: Object.values(groupedRecords).map((data) => {
          if (!data[1]) {
            return 0;
          } else {
            return data[1]["count(*)"];
          }
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default TodayPointCompareChart;
