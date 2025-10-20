import AdminLayout from "@/components/AdminLayout";
import PeriodToggle from "@/components/Analytics/PeriodToggle";
import SummaryCard from "@/components/Analytics/SummaryCard";
import { AnalyticsPeriod } from "@/generated/graphql";
import { useAnalytics } from "@/src/hooks/admin/analytics/api";
import { useState } from "react";

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
