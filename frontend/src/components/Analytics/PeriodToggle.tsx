import { AnalyticsPeriod } from "@/generated/graphql";
import type { Dispatch, SetStateAction } from "react";

type PeriodToggleProps = {
  period: AnalyticsPeriod;
  setPeriod: Dispatch<SetStateAction<AnalyticsPeriod>>;
};

export default function PeriodToggle({ period, setPeriod }: PeriodToggleProps) {
  const periods: { label: string; value: AnalyticsPeriod }[] = [
    { label: "月別", value: AnalyticsPeriod.Monthly },
    { label: "週別", value: AnalyticsPeriod.Weekly },
    { label: "日別", value: AnalyticsPeriod.Daily },
  ];

  return (
    <div className="flex w-max overflow-hidden rounded-full border">
      {periods.map((p) => (
        <button
          key={p.value}
          onClick={() => setPeriod(p.value)}
          className={`px-4 py-1 text-sm font-medium transition-colors ${
            period === p.value
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
