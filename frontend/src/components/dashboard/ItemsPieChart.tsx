// install (please try to align the version of installed @nivo packages)

import { ResponsivePie, Pie } from "@nivo/pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import data from "../../data/mockData.json";
import { BasicTooltip } from "@nivo/tooltip";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// const data = [
//   {
//     id: "hack",
//     label: "hack",
//     value: 141,
//     color: "hsl(137, 70%, 50%)",
//   },
//   {
//     id: "erlang",
//     label: "erlang",
//     value: 578,
//     color: "hsl(39, 70%, 50%)",
//   },
//   {
//     id: "stylus",
//     label: "stylus",
//     value: 493,
//     color: "hsl(113, 70%, 50%)",
//   },
//   {
//     id: "javascript",
//     label: "javascript",
//     value: 558,
//     color: "hsl(322, 70%, 50%)",
//   },
//   {
//     id: "c",
//     label: "c",
//     value: 385,
//     color: "hsl(320, 70%, 50%)",
//   },
// ];

const colors = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#bdb2ff",
  "#ffc6ff",
  "#fffffc",
  "#eae4e9",
  "#bee1e6",
  "#faedcd",
];

const totalItems = data.reduce((a, c) => a + c.value, 0);
const chartData = data.map((i, idx) => ({
  id: i.name,
  label: i.name,
  value: Math.round((i.value / totalItems) * 100 * 10) / 10,

  color: colors[idx],
}));

export const ItemsPieChart = () => (
  <Card className="h-[424px] bg-transparent border-none shadow-none">
    <CardHeader className="p-0 pb-1">
      <CardTitle>Top items collected breakdown by %</CardTitle>
      <CardDescription>
        Visual representation of item collection efforts, displaying cumulative
        data as a percentage for 2024.
      </CardDescription>
    </CardHeader>
    <ResponsivePie
      margin={{ top: -50, right: 10, bottom: 0, left: 10 }}
      data={chartData}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      // https://codesandbox.io/p/sandbox/nivo-custom-tooltip-9p3is?file=%2Fsrc%2FApp.tsx%3A63%2C32
      tooltip={({ datum }) => (
        <BasicTooltip id={datum.label} value={`${datum.value}%`} />
      )}
      arcLinkLabelsSkipAngle={180}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsOffset={-20}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      arcLabel={(d) => `${d.value}%`}
      colors={colors}
      theme={{
        tooltip: {
          container: {
            background: "white",
            color: "black",
            fontSize: "14px",
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
            padding: "10px",
          },
        },
      }}
      // colorBy="id"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      // legends={[
      //   {
      //     anchor: "top",
      //     direction: "row",
      //     justify: false,
      //     translateX: 0,
      //     translateY: 56,
      //     itemsSpacing: 0,
      //     itemWidth: 100,
      //     itemHeight: 18,
      //     itemTextColor: "#999",
      //     itemDirection: "left-to-right",
      //     itemOpacity: 1,
      //     symbolSize: 18,
      //     symbolShape: "circle",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000",
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />

    <CardFooter className="flex-col items-start gap-2 text-sm p-0 pt-0 ">
      <div className="flex gap-2 font-medium leading-none">
        Growing collection over time
      </div>
      <div className="leading-none text-muted-foreground">
        Visualizing the total collection efforts across all categories
      </div>
    </CardFooter>
  </Card>
);
