import type { AnalyticsPeriod } from "@/generated/graphql";
import { sdk } from "@/lib/graphql-client";
import { useQuery } from "@tanstack/react-query";

type AnalyticsResponse = Awaited<ReturnType<typeof sdk.fetchAnalytics>>;

export const useAnalytics = (period: AnalyticsPeriod) => {
  const { data, isFetching } = useQuery<AnalyticsResponse>({
    queryKey: ["analytics", period],
    queryFn: () => sdk.fetchAnalytics({ period }),
  });

  return {
    analytics: data?.Analytics,
    isLoading: isFetching,
  };
};
