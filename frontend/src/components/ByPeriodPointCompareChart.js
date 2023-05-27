import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ByPeriodPointCompareChart = ({ pointCompareStatistics, period, titleText }) => {
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
  // console.log(pointCompareStatistics);

  const weekDate = [];
  for (let i = 0; i <= period; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    weekDate.push(date.toLocaleDateString());
  }
  weekDate.reverse();
  // console.log(weekDate);

  const groupedRecords = pointCompareStatistics.reduce((acc, cur) => {
    const date = new Date(cur.score_date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(cur);
    return acc;
  }, {});

  const labels = weekDate;
  // console.log(labels);
  // console.log(Object.values(groupedRecords));
  // console.log(groupedRecords);
  // console.log(groupedRecords["2023. 5. 26."][1].score_type);
  // console.log(groupedRecords.labels[2]);
  const data = {
    labels,
    datasets: [
      {
        label: "상점받은 인원 수",
        data: labels.map((label) => {
          if (!groupedRecords[label]) {
            return 0;
          } else if (groupedRecords[label][0].score_type === "벌점") {
            return 0;
          } else if (groupedRecords[label][0].score_type === "상점") {
            return groupedRecords[label][0]["count(*)"];
          } else if (groupedRecords[label][1].score_type === "상점") {
            return groupedRecords[label][1]["count(*)"];
          } else {
            return 0;
          }
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "벌점받은 인원 수",
        data: labels.map((label) => {
          if (!groupedRecords[label]) {
            return 0;
          } else if (!groupedRecords[label][0]) {
            return 0;
          } else if (groupedRecords[label][0].score_type === "벌점") {
            return groupedRecords[label][0]["count(*)"];
          } else if (!groupedRecords[label][1]) {
            return 0;
          } else if (groupedRecords[label][1].score_type === "벌점") {
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

export default ByPeriodPointCompareChart;
