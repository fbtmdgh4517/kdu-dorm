import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeeklyApplicationCompareChart = ({ weeklyApplicationCompareStatistics, period, titleText }) => {
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

  // console.log(weeklyApplicationCompareStatistics);

  const weekDate = [];
  for (let i = 0; i <= period; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    weekDate.push(date.toLocaleDateString());
  }
  weekDate.reverse();

  const groupedRecords = weeklyApplicationCompareStatistics.reduce((acc, cur) => {
    const date = new Date(cur.application_date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(cur);
    return acc;
  }, {});

  // console.log(Object.keys(groupedRecords));
  // console.log(Object.values(groupedRecords));
  // console.log(groupedRecords[labels[0]]);
  // console.log(groupedRecords);

  const labels = weekDate;

  const data = {
    labels,
    datasets: [
      {
        label: "외박신청 승인 수",
        data: labels.map((label) => {
          if (!groupedRecords[label]) {
            return 0;
          } else if (groupedRecords[label][0].approval_status === "거부") {
            return 0;
          } else if (groupedRecords[label][0].approval_status === "승인") {
            return groupedRecords[label][0]["count(*)"];
          } else {
            return 0;
          }
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "외박신청 거부 수",
        data: labels.map((label) => {
          if (!groupedRecords[label]) {
            return 0;
          } else if (groupedRecords[label][0].approval_status === "거부") {
            return groupedRecords[label][0]["count(*)"];
          } else if (!groupedRecords[label][1]) {
            return 0;
          } else if (groupedRecords[label][1].approval_status === "거부") {
            return groupedRecords[label][1]["count(*)"];
          } else {
            return 0;
          }
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default WeeklyApplicationCompareChart;
