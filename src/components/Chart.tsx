import type { ChartData } from "@/types/globals";
import { formatDownload } from "@/utils/format";
import { ResponsiveLine } from "@nivo/line";

const Chart = ({ data }: { data: ChartData[] }) => (
  <ResponsiveLine
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
    margin={{ top: 50, right: 150, bottom: 50, left: 150 }}
    xScale={{ type: "point" }}
    tooltip={({ point }) => (
      <div
        style={{
          background: "#4b5563",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            background: point.serieColor,
            marginRight: "5px",
          }}
        />
        <div>{formatDownload(Number(point.data.yFormatted))}</div>
      </div>
    )}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    curve="cardinal"
    axisTop={null}
    axisRight={null}
    axisLeft={{
      format: (value) => formatDownload(value),
    }}
    enableGridY={false}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default Chart;
