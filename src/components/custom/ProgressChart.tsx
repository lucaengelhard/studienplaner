import useResize from "@/hooks/useResize";
import { useMemo } from "react";

export default function ProgressChart({
  color,
  max,
  value,
  label,
  threshold,
  score,
  strokeWidth,
  showMax,
}: {
  value: number;
  max: number;
  threshold?: number;
  color: string;
  label?: string;
  score?: boolean;
  strokeWidth?: number;
  showMax?: boolean;
}) {
  const [container, size] = useResize<HTMLDivElement>();

  const radius = useMemo(
    () => size.width / 2 - (strokeWidth ? strokeWidth / 2 : 0),
    [size.width, strokeWidth]
  );

  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const offset = useMemo(
    () => circumference - (value / max) * circumference,
    [circumference, max, value]
  );

  return (
    <div className="relative w-full h-full aspect-square" ref={container}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
        {score && (
          <>
            <div>
              {score && value}
              {showMax && "/" + max}
            </div>
            {label && <div className="text-xl text-center">{label}</div>}
            {threshold && (
              <div className="text-xl font-normal text-center">
                {value - threshold}
              </div>
            )}
          </>
        )}
      </div>

      <svg width={"100%"} height={"100%"}>
        <circle
          r={radius}
          cy="50%"
          cx="50%"
          fill="none"
          stroke="#ddd"
          strokeWidth={strokeWidth ?? 20}
        />

        <circle
          r={radius}
          cy="50%"
          cx="50%"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth ?? 20}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
