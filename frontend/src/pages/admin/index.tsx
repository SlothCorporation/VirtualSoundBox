import AdminLayout from "@/components/AdminLayout";
import { AnalyticsPeriod } from "@/generated/graphql";
import { useAnalytics } from "@/src/hooks/admin/analytics/api";
import type { SetStateAction } from "jotai";
import type { Dispatch } from "react";
import { useState } from "react";
import { MdArrowDownward, MdArrowUpward, MdRemove } from "react-icons/md";

type PeriodToggleProps = {
  period: AnalyticsPeriod;
  setPeriod: Dispatch<SetStateAction<AnalyticsPeriod>>;
};

function PeriodToggle({ period, setPeriod }: PeriodToggleProps) {
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

type SummaryCardProps = {
  title: string;
  current: number;
  previous: number;
};

function SummaryCard({ title, current, previous }: SummaryCardProps) {
  const diff = current - previous;
  const rate = previous === 0 ? 0 : ((diff / previous) * 100).toFixed(1); // %換算

  const isUp = diff > 0;
  const isDown = diff < 0;

  const color = isUp
    ? "text-green-600"
    : isDown
      ? "text-red-600"
      : "text-gray-600";
  const Icon = isUp ? MdArrowUpward : isDown ? MdArrowDownward : MdRemove;

  return (
    <div className="flex min-w-[200px] flex-col items-center gap-1 rounded-2xl bg-white p-4 shadow">
      <span className="text-sm text-gray-500">{title}</span>

      {/* current を中央揃え */}
      <span className="text-center text-2xl font-semibold">
        {current.toLocaleString()}
      </span>

      {/* 差分も中央揃え */}
      <div className={`flex items-center text-sm ${color}`}>
        <Icon className="mr-1 size-4" />
        {isUp || isDown
          ? `${isUp ? "+" : "-"}${Math.abs(Number(rate))}% (${diff.toLocaleString()})`
          : "-"}
      </div>
    </div>
  );
}

function Dashboard() {
  const [period, setPeriod] = useState<AnalyticsPeriod>(AnalyticsPeriod.Weekly);
  const { analytics, isLoading } = useAnalytics(period);

  console.log(analytics, isLoading);
  return (
    <div className="flex max-w-[1200px] flex-col gap-4">
      <div className="flex w-full justify-end">
        <PeriodToggle period={period} setPeriod={setPeriod} />
      </div>
      <div className="flex gap-2">
        <SummaryCard
          title="総PV数"
          current={analytics?.current?.summary.pageViews ?? 0}
          previous={analytics?.previous?.summary.pageViews ?? 0}
        />
        <SummaryCard
          title="ユーザー数"
          current={analytics?.current?.summary.users ?? 0}
          previous={analytics?.previous?.summary.users ?? 0}
        />
        <SummaryCard
          title="総セッション数"
          current={analytics?.current?.summary.sessions ?? 0}
          previous={analytics?.previous?.summary.sessions ?? 0}
        />
      </div>
      <div></div>
    </div>
  );
}

export default function Page() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">管理者ダッシュボード</h1>
        <Dashboard />
      </div>
    </AdminLayout>
  );
}
