import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TodayRollCallCompareChart = ({ todayRollCallCompareStatistics }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "일간 점호 통계 그래프",
      },
    },
  };
  console.log(todayRollCallCompareStatistics);

  const weekDate = [];
  for (let i = 0; i < 2; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    weekDate.push(date.toLocaleDateString());
  }
  weekDate.reverse();
  console.log(weekDate);

  const groupedRecords = todayRollCallCompareStatistics.reduce((acc, cur) => {
    const date = new Date(cur.record_date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(cur);
    return acc;
  }, {});

  const labels = weekDate;

  console.log(Object.values(groupedRecords));

  const data = {
    labels,
    datasets: [
      {
        label: "무단 외박한 인원 수",
        data: labels.map((label) => {
          if (!groupedRecords[label]) {
            return 0;
          } else {
            return groupedRecords[label][0]["count(*)"];
          }
        }),
        // data: Object.values(groupedRecords).map((data) => {
        //   if (!data[0]) {
        //     return 0;
        //   } else {
        //     return data[0]["count(*)"];
        //   }
        // }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "점호 완료한 인원 수",
        data: labels.map((label) => {
          if (!groupedRecords[label]) {
            return 0;
          } else {
            return groupedRecords[label][2]["count(*)"];
          }
        }),
        // data: Object.values(groupedRecords).map((data) => {
        //   if (!data[2]) {
        //     return 0;
        //   } else {
        //     return data[2]["count(*)"];
        //   }
        // }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "외박한 인원 수",
        data: labels.map((label) => {
          if (!groupedRecords[label]) {
            return 0;
          } else {
            return groupedRecords[label][1]["count(*)"];
          }
        }),
        // data: Object.values(groupedRecords).map((data) => {
        //   if (!data[1]) {
        //     return 0;
        //   } else {
        //     return data[1]["count(*)"];
        //   }
        // }),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default TodayRollCallCompareChart;
