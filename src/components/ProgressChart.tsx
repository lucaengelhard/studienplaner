import {
  RadialBarChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  Label,
  RadialBar,
} from "recharts";
import { ChartConfig, ChartContainer } from "./ui/chart";
import { useMemo } from "react";

export type chartData = [{ [key: keyof ChartConfig]: number }];

export default function ProgressChart({
  config,
  data,
  maxValue,
}: {
  config: ChartConfig;
  data: chartData;
  maxValue: number;
}) {
  const totalPointsEarned = useMemo(
    () => Object.values(data[0]).reduce((acc, curr) => (acc += curr), 0),
    [data]
  );

  return (
    <ChartContainer config={config}>
      <RadialBarChart
        data={data}
        innerRadius={"60%"}
        outerRadius={"80%"}
        barSize={70}
        startAngle={0}
        endAngle={350}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, maxValue]}
          tick
        ></PolarAngleAxis>
        <PolarRadiusAxis
          type="number"
          domain={[0, maxValue]}
          tick={false}
          tickLine={false}
          axisLine={false}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {totalPointsEarned.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-muted-foreground"
                    >
                      Credits
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>

        {Object.keys(data[0]).map((key, index) => (
          <RadialBar
            dataKey={key}
            fill={`var(--color-${key})`}
            stackId={"a"}
            cornerRadius={10}
            background={index === 0}
            key={key}
          />
        ))}
      </RadialBarChart>
    </ChartContainer>
  );
}
