import { TrendingUp } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import data from "../../data/mockData.json";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useFetch } from "@/hooks/use-fetch";
import LoadingSpinner from "../LoadingSpinner";
export const description = "A horizontal bar chart";

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

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

const chartData = data.map((i, idx) => ({ ...i, fill: colors[idx] }));

export function ItemsBarChart() {
  // TODO PUT THIS IN DB
  // const { data, isPending } = useFetch("/api/items/current/totals", [
  //   "fetchCurrItemsTotals",
  // ]);
  // const chartData = data?.map((i, idx) => ({ ...i, fill: colors[idx] }));

  // if (isPending) {
  //   return <LoadingSpinner />;
  // }

  return (
    // <div className="relative overflow-hidden rounded-lg bg-background/80 p-6 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
    <Card className="bg-transparent border-none shadow-none overflow-auto ">
      <CardHeader className="p-1 pb-1">
        <CardTitle>Top items collected breakdown</CardTitle>
        <CardDescription>Cumulative data as of 2024</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-1 ">
        <ChartContainer config={chartConfig} className="min-h-[300px]">
          {/* <ResponsiveContainer> */}
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            // height={550}
            margin={{
              left: 10, // Increased left margin for Y-axis labels
              top: 10,
              bottom: 10,
              right: 20,
            }}
            // barSize={23}
            // barGap={140}
            // barCategoryGap={90}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="name"
              type="category"
              // tick={{ fontSize: window.innerWidth < 600 ? 8 : 14 }}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.split("-").join(" ")}
              tick={{ fontSize: 12 }}
              width={110}
              // width={window.innerWidth < 600 ? 140 : 140} // Adjust width based on screen size
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-desktop)" radius={5} />
          </BarChart>
          {/* </ResponsiveContainer> */}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm p-1 pt-0 ">
        <div className="flex gap-2 font-medium leading-none">
          Growing collection over time <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Visualizing the total collection efforts across all categories
        </div>
      </CardFooter>
    </Card>
    // </div>
  );
}
