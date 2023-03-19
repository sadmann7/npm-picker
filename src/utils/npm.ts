import type { ChartData, PkgData, PkgDownload } from "@/types/globals";
import dayjs from "dayjs";

export const getChartData = (data: PkgData): ChartData => {
  const { downloads } = data;
  const chartData: ChartData = {
    id: data.package,
    data: [],
  };

  downloads.forEach((download: PkgDownload) => {
    chartData.data.push({
      x: dayjs(download.day).format("MMM DD"),
      y: download.downloads,
    });
  });

  return chartData;
};
