import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeeklyRollCallCompareChart = ({ weeklyRollCallCompareStatistics, period, titleText }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: titleText,
      },
    },
  };
  // console.log(weeklyRollCallCompareStatistics);

  const weekDate = [];
  for (let i = 0; i <= period; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    weekDate.push(date.toLocaleDateString());
  }
  weekDate.reverse();
  // console.log(weekDate);

  const groupedRecords = weeklyRollCallCompareStatistics.reduce((acc, cur) => {
    const date = new Date(cur.record_date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(cur);
    return acc;
  }, {});

  const labels = weekDate;

  // console.log(Object.values(groupedRecords));
  console.log(groupedRecords);
  const data = {
    labels,
    datasets: [
      {
        label: "무단 외박한 인원 수",
        data: labels.map((label) => {
          if (!groupedRecords[label]) {
            return 0;
          } else if (groupedRecords[label][0].is_checked === "무단외박") {
            return groupedRecords[label][0]["count(*)"];
          } else {
            return 0;
          }
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "점호 완료한 인원 수",
        data: labels.map((label) => {
          if (!groupedRecords[label]) {
            return 0;
          } else if (groupedRecords[label][0].is_checked === "완료") {
            return groupedRecords[label][0]["count(*)"];
          } else if (groupedRecords[label][1] && groupedRecords[label][1].is_checked === "완료") {
            return groupedRecords[label][1]["count(*)"];
          } else if (groupedRecords[label][2] && groupedRecords[label][2].is_checked === "완료") {
            return groupedRecords[label][2]["count(*)"];
          } else {
            return 0;
          }
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "외박한 인원 수",
        data: labels.map((label) => {
          if (!groupedRecords[label]) {
            return 0;
          } else if (groupedRecords[label][0].is_checked === "외박") {
            return groupedRecords[label][0]["count(*)"];
          } else if (groupedRecords[label][1] && groupedRecords[label][1].is_checked === "외박") {
            return groupedRecords[label][1]["count(*)"];
          } else {
            return 0;
          }
        }),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default WeeklyRollCallCompareChart;
