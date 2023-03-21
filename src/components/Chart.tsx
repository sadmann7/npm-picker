import type { ChartData } from "@/types/globals";
import { formatDownload } from "@/utils/format";
import { ResponsiveLine } from "@nivo/line";

const Chart = ({ data }: { data: ChartData[] }) => {
  return (
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
            strokeWidth: 1,
            strokeDasharray: "2 2",
          },
        },
        legends: {
          text: {
            textTransform: "capitalize",
          },
        },
      }}
      data={data}
      margin={{ top: 75, right: 75, bottom: 75, left: 75 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="cardinal"
      tooltip={({ point }) => (
        <div
          style={{
            background: "#374151",
            color: "#e5e7eb",
            padding: "9px 12px",
            borderRadius: "4px",
          }}
        >
          <strong>{point.data.xFormatted}</strong>
          <br />
          <span style={{ color: point.serieColor }}>
            {point.serieId}: {formatDownload(Number(point.data.yFormatted))}
          </span>
        </div>
      )}
      axisBottom={{
        tickSize: 0,
        tickPadding: 14,
        tickRotation: 0,
      }}
      axisLeft={null}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableCrosshair={false}
      useMesh={true}
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          justify: false,
          translateX: 0,
          translateY: -60,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 1,
          symbolSize: 12,
          symbolShape: "square",
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
};

export default Chart;
