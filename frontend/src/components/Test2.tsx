"use client";

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Monitor } from "lucide-react";

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

export const description = "A responsive horizontal bar chart";

const chartData = [
  { item: "Others", value: 400 },
  { item: "Cigarette", value: 300 },
  { item: "Packaging", value: 200 },
  { item: "Plastic Wrapper", value: 100 },
  { item: "Tissue", value: 90 },
  { item: "Bags", value: 80 },
  { item: "Plastic Bottle", value: 70 },
  { item: "Metal Can", value: 60 },
  { item: "Glass Bottle", value: 50 },
  { item: "Cups", value: 40 },
  { item: "Mask", value: 30 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Component() {
  const [chartHeight, setChartHeight] = useState(400);

  useEffect(() => {
    const updateHeight = () => {
      const newHeight = Math.max(400, chartData.length * 40);
      setChartHeight(newHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Items breakdown</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                left: 100,
                right: 20,
                top: 10,
                bottom: 10,
              }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="item"
                type="category"
                width={90}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total items for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
