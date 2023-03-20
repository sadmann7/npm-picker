import { ResponsiveBump } from "@nivo/bump";

const Chart = ({
  data,
}: {
  data: {
    id: string;
    data: {
      x: string;
      y: number;
    }[];
  }[];
}) => {
  return (
    <ResponsiveBump
      theme={{
        fontSize: 14,
        textColor: "#d1d5db",
        tooltip: {
          container: {
            background: "#1f2937",
            color: "#e5e7eb",
          },
        },
        grid: {
          line: {
            stroke: "#4b5563",
            strokeWidth: 2,
            strokeDasharray: "2 2",
          },
        },
      }}
      data={data}
      colors={{ scheme: "nivo" }}
      lineWidth={4}
      activeLineWidth={6}
      inactiveLineWidth={4}
      inactiveOpacity={0.15}
      startLabel={true}
      pointSize={10}
      activePointSize={16}
      inactivePointSize={0}
      pointColor={{ theme: "background" }}
      pointBorderWidth={3}
      activePointBorderWidth={3}
      pointBorderColor={{ from: "serie.color" }}
      enableGridY={false}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -36,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={null}
      margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
      axisRight={null}
    />
  );
};

export default Chart;
