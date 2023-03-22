import { formatDownload } from "@/utils/format";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({
  data,
  windowWidth,
}: {
  data: ChartData<"line">;
  windowWidth?: number;
}) => {
  const options: ChartOptions<"line"> = {
    aspectRatio: windowWidth ? (windowWidth < 768 ? 1.7 : 2.5) : 2,
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        labels: {
          color: "#f9fafb",
        },
      },
      tooltip: {
        padding: 10,
        backgroundColor: "hsla(215, 14%, 34%, 0.9)",
        titleColor: "#f9fafb",
        bodyColor: "#e5e7eb",
        borderColor: "hsla(0, 0%, 100%, 0.2)",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        grid: {
          color: "hsla(0, 0%, 100%, 0.2)",
          tickLength: 0,
        },
        ticks: {
          padding: 10,
          color: "#e5e7eb",
          callback: (value) => formatDownload(Number(value)),
        },
      },
      x: {
        type: "category" as const,
        display: true,
        position: "bottom" as const,
        grid: {
          color: "hsla(0, 0%, 100%, 0.2)",
          tickLength: 0,
        },
        ticks: {
          padding: 10,
          color: "#e5e7eb",
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
