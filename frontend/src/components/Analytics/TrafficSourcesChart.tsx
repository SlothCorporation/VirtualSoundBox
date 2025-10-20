import type { TrafficSource } from "@/generated/graphql";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa"];

export default function TrafficSourcesChart({
  data,
}: {
  data: TrafficSource[];
}) {
  const chartData = data.map((d) => ({
    name: d.source,
    value: d.current.sessions ?? 0,
  }));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        流入経路別ユーザー数
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-4 text-sm text-gray-600">
        {data.map((d, i) => {
          const diff = (d.current.sessions ?? 0) - (d.previous?.sessions ?? 0);
          const rate =
            d.previous?.sessions && d.previous.sessions > 0
              ? (diff / d.previous.sessions) * 100
              : 0;
          const color =
            diff > 0
              ? "text-green-600"
              : diff < 0
                ? "text-red-600"
                : "text-gray-500";
          const icon = diff > 0 ? "▲" : diff < 0 ? "▼" : "–";

          return (
            <li key={d.source} className="flex justify-between border-t py-1">
              <span className="flex items-center gap-2">
                <span
                  className="block size-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                {d.source}
              </span>
              <span>
                {d.current.sessions?.toLocaleString()}{" "}
                {d.previous && (
                  <span className={`ml-2 text-xs ${color}`}>
                    {icon} {Math.abs(rate).toFixed(1)}%
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
