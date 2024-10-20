import { useMemo } from "react";

export type ProgressChartData = ProgressChartDataPoint[];
export type ProgressChartDataPoint = {
  name: string;
  color: string;
  value: number;
};

export type ProgressChartGoal = { name: string; value: number };

export default function ProgressChart({
  size,
  stroke,
  data,
  max,
  goals,
}: {
  size: number;
  stroke: number;
  data: ProgressChartData;
  max?: number;
  goals?: ProgressChartGoal[];
}) {
  const calculatedMax = useMemo(() => {
    if (max) return max;
    if (goals) {
      return goals.reduce((maxObj, currentObj) =>
        currentObj.value > maxObj.value ? currentObj : maxObj
      ).value;
    }

    return data.reduce(
      (accumulator, current) => accumulator + current.value,
      0
    );
  }, [data, goals, max]);

  return (
    <div style={{ height: size + "px" }} className="aspect-square">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/**
        <circle
          r={circleRadius}
          cx={"50%"}
          cy={"50%"}
          fill="none"
          className="stroke-slate-200"
          strokeWidth={stroke}
        ></circle> */}
        {data.map((datapoint) => (
          <ProgressChartSlice
            size={size}
            stroke={stroke}
            max={calculatedMax}
            datapoint={datapoint}
          />
        ))}
      </svg>
    </div>
  );
}

function ProgressChartSlice({
  size,
  stroke,
  max,
  datapoint,
}: {
  stroke: number;
  max: number;
  datapoint: ProgressChartDataPoint;
  size: number;
}) {
  const radius = useMemo(() => (size * 0.8) / 2, [size]);

  const angle = useMemo(
    () => (datapoint.value / max) * 360,
    [datapoint.value, max]
  );

  console.log(max);

  const largeArcFlag = useMemo(() => (angle > 180 ? 1 : 0), [angle]);

  const x = useMemo(
    () => radius + radius * Math.cos((Math.PI * (angle - 90)) / 180),
    [angle, radius]
  );
  const y = useMemo(
    () => radius + radius * Math.sin((Math.PI * (angle - 90)) / 180),
    [angle, radius]
  );

  return (
    <path
      d={`
        M ${size / 2} ${size / 2}
        L ${radius}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y}
        Z
      `}
      strokeWidth={stroke}
      stroke={datapoint.color}
    />
  );
}
