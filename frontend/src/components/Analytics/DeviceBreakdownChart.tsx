import type { DeviceUsage } from "@/generated/graphql";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#60a5fa", "#34d399", "#fbbf24"];

export default function DeviceBreakdownChart({
  data,
}: {
  data: DeviceUsage[];
}) {
  const chartData = data.map((d) => ({
    name: d.device,
    value: d.current.users ?? 0,
  }));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        デバイス別ユーザー数
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => value.toLocaleString()} />
            <Bar dataKey="value" fill="#60a5fa" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-4 text-sm text-gray-600">
        {data.map((d, i) => {
          const diff = (d.current.users ?? 0) - (d.previous?.users ?? 0);
          const rate =
            d.previous?.users && d.previous.users > 0
              ? (diff / d.previous.users) * 100
              : 0;
          const color =
            diff > 0
              ? "text-green-600"
              : diff < 0
                ? "text-red-600"
                : "text-gray-500";
          const icon = diff > 0 ? "▲" : diff < 0 ? "▼" : "–";

          return (
            <li key={d.device} className="flex justify-between border-t py-1">
              <span className="flex items-center gap-2">
                <span
                  className="block size-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                {d.device}
              </span>
              <span>
                {d.current.users?.toLocaleString()}{" "}
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
