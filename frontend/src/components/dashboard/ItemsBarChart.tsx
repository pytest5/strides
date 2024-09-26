import { Monitor, TrendingUp } from "lucide-react";
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
export const description = "A horizontal bar chart";

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig;

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
  // const { data, isPending } = useFetch("/api/items/totals", "ItemsBarChart");

  // if (isPending) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    // <div className="relative overflow-hidden rounded-lg bg-background/80 p-6 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
    <Card className="bg-transparent border-none shadow-none ">
      <CardHeader className="p-0 pb-1">
        <CardTitle>Top items collected breakdown</CardTitle>
        <CardDescription>Cumulative data as of 2024</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-1">
        <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            height={250}
            margin={{
              left: 10, // Increased left margin for Y-axis labels
              top: 20,
              bottom: 20,
              right: 20,
            }}
            barSize={23}
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
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm p-0 pt-0 ">
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

// [
//   {
//     name: "Others",
//     material_type: "NA",
//     image_url:
//       "https://storage.googleapis.com/stridy-assets/uploads/pickup_item/image/9/11.png",
//     value: 243291,
//   },
//   {
//     name: "Cigarette",
//     material_type: "NA",
//     image_url:
//       "https://storage.googleapis.com/stridy-assets/uploads/pickup_item/image/4/17.png",
//     value: 201758,
//   },
//   {
//     name: "Packaging",
//     material_type: "NA",
//     image_url:
//       "https://storage.googleapis.com/stridy-assets/uploads/pickup_item/image/5/12.png",
//     value: 123304,
//   },
//   {
//     name: "Plastic - Wrapper",
//     material_type: "Plastic",
//     image_url:
//       "https://storage.googleapis.com/stridy-assets/uploads/pickup_item/image/3/12.png",
//     value: 46674,
//   },
//   {
//     name: "Tissue",
//     material_type: "NA",
//     image_url:
//       "https://storage.googleapis.com/stridy-assets/uploads/pickup_item/image/12/13.png",
//     value: 46033,
//   },
//   {
//     name: "Bags",
//     material_type: "NA",
//     image_url:
//       "https://storage.googleapis.com/stridy-assets/uploads/pickup_item/image/1/10.png",
//     value: 43336,
//   },
//   {
//     name: "Plastic - Bottle",
//     material_type: "Plastic",
//     image_url:
//       "https://storage.googleapis.com/stridy-assets/uploads/pickup_item/image/2/8.png",
//     value: 42772,
//   },
//   {
//     name: "Metal - Can",
//     material_type: "Metal",
//     image_url:
//       "https://storage.googleapis.com/stridy-assets/uploads/pickup_item/image/8/3.png",
//     value: 41383,
//   },
//   {
//     name: "Glass - Bottle",
//     material_type: "Glass",
//     image_url:
//       "https://storage.googleapis.com/stridy-assets/uploads/pickup_item/image/7/9.png",
//     value: 15796,
//   },
//   {
//     name: "Cups",
//     material_type: "NA",
//     image_url:
//       "https://storage.googleapis.com/stridy-assets/uploads/pickup_item/image/13/14.png",
//     value: 13705,
//   },
//   {
//     name: "Mask",
//     material_type: "NA",
//     image_url:
//       "https://storage.googleapis.com/stridy-assets/uploads/pickup_item/image/6/7.png",
//     value: 7898,
//   },
// ];
