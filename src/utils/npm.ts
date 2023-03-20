import type { ChartData, PkgData, PkgDownload } from "@/types/globals";
import dayjs from "dayjs";

export const getChartData = (data: PkgData): ChartData => {
  const { downloads } = data;
  const chartData: ChartData = {
    id: data.package,
    data: [],
  };

  downloads.forEach((download: PkgDownload) => {
    const date = dayjs(download.day);
    const month = date.format("MMM YYYY");
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
