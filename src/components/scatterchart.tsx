import { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ZAxis,
} from "recharts";
import type { EarthquakeRecord } from "../typescript/earthquake";

interface ScatterChartProps {
  data: EarthquakeRecord[];
  selectedId: string | null;
  onPointSelect: (id: string) => void;
  xAxisKey: keyof EarthquakeRecord;
  yAxisKey: keyof EarthquakeRecord;
  setXAxisKey: (key: keyof EarthquakeRecord) => void;
  setYAxisKey: (key: keyof EarthquakeRecord) => void;
}

export default function EarthquakeScatterChart({
  data,
  selectedId,
  onPointSelect,
  xAxisKey,
  yAxisKey,
  setXAxisKey,
  setYAxisKey,
}: ScatterChartProps) {
  const numericOptions = [
    "mag",
    "depth",
    "latitude",
    "longitude",
    "gap",
    "nst",
    "rms",
    "dmin",
  ] as (keyof EarthquakeRecord)[];

  const chartData = useMemo(() => {
    return data.filter((row) => {
      const x = row[xAxisKey];
      const y = row[yAxisKey];
      return typeof x === "number" && typeof y === "number";
    });
  }, [data, xAxisKey, yAxisKey]);

  return (
    <div className="chart-card">
      <div className="chart-controls">
        <div>
          <label>X-Axis: </label>
          <select
            value={String(xAxisKey)}
            onChange={(e) =>
              setXAxisKey(e.target.value as keyof EarthquakeRecord)
            }
          >
            {numericOptions.map((option) => (
              <option key={String(option)} value={String(option)}>
                {String(option)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Y-Axis: </label>
          <select
            value={String(yAxisKey)}
            onChange={(e) =>
              setYAxisKey(e.target.value as keyof EarthquakeRecord)
            }
          >
            {numericOptions.map((option) => (
              <option key={String(option)} value={String(option)}>
                {String(option)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="chart-area">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey={String(xAxisKey)} />
            <YAxis type="number" dataKey={String(yAxisKey)} />
            <ZAxis range={[60, 60]} />
            <Tooltip />
            <Scatter
              data={chartData}
              onClick={(point: any) => {
                const clickedRow = point?.payload as EarthquakeRecord | undefined;
                if (clickedRow?.id) {
                  onPointSelect(clickedRow.id);
                }
              }}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={entry.id === selectedId ? "#dc2626" : "#2563eb"}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}