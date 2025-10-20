import AdminLayout from "@/components/AdminLayout";
import PeriodToggle from "@/components/Analytics/PeriodToggle";
import SummaryCard from "@/components/Analytics/SummaryCard";
import { AnalyticsPeriod } from "@/generated/graphql";
import ArticlePerformanceTable from "@/src/components/Analytics/ArticlePerformanceTable";
import DeviceBreakdownChart from "@/src/components/Analytics/DeviceBreakdownChart";
import TrafficSourcesChart from "@/src/components/Analytics/TrafficSourcesChart";
import { useAnalytics } from "@/src/hooks/admin/analytics/api";
import { useState } from "react";

function Dashboard() {
  const [period, setPeriod] = useState<AnalyticsPeriod>(AnalyticsPeriod.Weekly);
  const { analytics } = useAnalytics(period);

  return (
    <div className="flex max-w-[1200px] flex-col gap-4">
      <div className="flex w-full justify-end">
        <PeriodToggle period={period} setPeriod={setPeriod} />
      </div>
      <div className="flex gap-2">
        <SummaryCard
          title="総PV数"
          current={analytics?.summary.current.pageViews ?? 0}
          previous={analytics?.summary.previous?.pageViews ?? 0}
        />
        <SummaryCard
          title="ユーザー数"
          current={analytics?.summary.current.users ?? 0}
          previous={analytics?.summary.previous?.users ?? 0}
        />
        <SummaryCard
          title="総セッション数"
          current={analytics?.summary.current.sessions ?? 0}
          previous={analytics?.summary.previous?.sessions ?? 0}
        />
      </div>
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <ArticlePerformanceTable data={analytics?.articleViews ?? []} />
        <div className="flex flex-1 flex-col gap-4">
          <TrafficSourcesChart data={analytics?.trafficSources ?? []} />
          <DeviceBreakdownChart data={analytics?.deviceUsage ?? []} />
        </div>
      </div>
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
