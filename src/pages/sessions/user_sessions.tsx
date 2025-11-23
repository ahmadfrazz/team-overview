import { SessionScoreTrendsChart } from "@/components/charts/session_score_trends_chart";
import SessionsTable from "@/components/user_session/sessions_table";
import { useSessionTrends } from "@/hooks/use_session_trends";
import { useUrlSync } from "@/hooks/use_url_sync";
import { useCallback } from "react";

const UserSessions = () => {
  const { filters, setFilters } = useUrlSync({
    trendDays: "30", // default day
  });
  const trendDays = Number(filters.trendDays) || 30;

  const {
    data: sessionTrends = [],
    isLoading: isTrendsLoading,
    isError: isTrendsError,
    error: trendsError,
    refetch: refetchTrends,
  } = useSessionTrends(trendDays);

  const handleDaysChange = useCallback(
    (value: number) => {
      setFilters((prev) => ({
        // preserving other filter params
        ...prev,
        trendDays: String(value),
      }));
    },
    [setFilters]
  );

  return (
    <div className="space-y-6">
      <SessionScoreTrendsChart
        data={sessionTrends}
        days={trendDays}
        onDaysChange={handleDaysChange}
        isLoading={isTrendsLoading}
        isError={isTrendsError}
        error={trendsError}
        refetch={refetchTrends}
      />
      <SessionsTable />
    </div>
  );
};

export default UserSessions;
