import type { ChartDataNivo, PkgData, PkgDownload } from "@/types/globals";
import { ChartData } from "chart.js";
import dayjs from "dayjs";

export const getChartData = (data: PkgData[]): ChartData<"line"> => {
  const colors = [
    {
      backgroundColor: "hsla(9, 87%, 67%, 0.2)",
      borderColor: "hsla(9, 87%, 67%, 1)",
    },
    {
      backgroundColor: "hsla(54, 84%, 65%, 0.2)",
      borderColor: "hsla(54, 84%, 65%, 1)",
    },
    {
      backgroundColor: "hsla(169, 58%, 74%, 0.2)",
      borderColor: "hsla(169, 58%, 74%, 1)",
    },
  ];

  const groupedLabels = data.reduce((acc, item) => {
    const { downloads } = item;
    downloads.forEach((download: PkgDownload) => {
      const date = dayjs(download.day);
      const month = date.format("MMM, YY");
      if (!acc.includes(month)) {
        acc.push(month);
      }
    });
    return acc;
  }, [] as string[]);

  const datasets = data.map((item, i) => {
    const { downloads } = item;
    const data = groupedLabels.map((label) => {
      const download = downloads.find(
        (download: PkgDownload) =>
          dayjs(download.day).format("MMM, YY") === label
      );
      return download ? download.downloads : 0;
    });
    return {
      label: item.package,
      data,
      ...colors[i],
      yAxisID: "y",
    };
  });

  return {
    labels: groupedLabels,
    datasets,
  };
};

export const formatDownload = (value: number): string => {
  return value < 1000
    ? value.toString()
    : value < 1000000
    ? `${(value / 1000).toFixed(0)}K`
    : `${(value / 1000000).toFixed(0)}M`;
};

export const getNivoChartData = (data: PkgData): ChartDataNivo => {
  const { downloads } = data;
  const chartData: ChartDataNivo = {
    id: data.package,
    data: [],
  };

  downloads.forEach((download: PkgDownload) => {
    const date = dayjs(download.day);
    const month = date.format("MMM, YY");
    const index = chartData.data.findIndex((item) => item.x === month);

    if (index === -1) {
      chartData.data.push({
        x: month,
        y: download.downloads,
      });
    } else {
      chartData.data[index].y += download.downloads;
    }
  });

  return chartData;
};
