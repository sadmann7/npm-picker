import type { ChartDataNivo, PkgData, PkgDownload } from "@/types/globals";
import { DURATION } from "@/types/globals";
import type { ChartData } from "chart.js";
import dayjs from "dayjs";

export const getChartData = (
  data: PkgData[],
  duration: DURATION
): ChartData<"line"> => {
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
      const month = date.format(
        duration === DURATION.LAST_WEEK
          ? "dddd"
          : duration === DURATION.LAST_MONTH
          ? "MMM DD"
          : "MMMM"
      );
      if (!acc.includes(month)) {
        acc.push(month);
      }
    });
    return acc;
  }, [] as string[]);

  const datasets = data.map((item, i) => {
    const { downloads } = item;
    const data = groupedLabels.map((label) => {
      const pkgDownload = downloads.find(
        (download: PkgDownload) =>
          dayjs(download.day).format(
            duration === DURATION.LAST_WEEK
              ? "dddd"
              : duration === DURATION.LAST_MONTH
              ? "MMM DD"
              : "MMMM"
          ) === label
      );
      return pkgDownload ? pkgDownload.downloads : 0;
    });
    return {
      label: toSentenceCase(item.package),
      data,
      ...colors[i],
      tension: 0.3,
    };
  });

  return {
    labels: groupedLabels,
    datasets,
  };
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

export const formatDownload = (value: number): string => {
  return value < 1000
    ? value.toString()
    : value < 1000000
    ? `${(value / 1000).toFixed(0)}K`
    : `${(value / 1000000).toFixed(0)}M`;
};

export const toSentenceCase = (str: string): string => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
};

export const toTitleCase = (str: string): string => {
  return str
    .split("-")
    .map((word, i) => {
      return i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    })
    .join(" ");
};
