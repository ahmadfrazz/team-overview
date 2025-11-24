import { SessionScoreTrendsChart } from "@/components/charts/session_score_trends_chart";
import SessionDetailsModal from "@/components/modals/session_details_modal";
import SessionsTable from "@/components/user_session/sessions_table";
import { useSessionTrends } from "@/hooks/use_session_trends";
import { useSessionsData } from "@/hooks/use_sessions_data";
import { useUrlSync } from "@/hooks/use_url_sync";
import { useCallback } from "react";

const UserSessions = () => {
  const { filters, setFilters } = useUrlSync({
    trendDays: "30", // default day
    session_id: "",
  });
  const trendDays = Number(filters.trendDays) || 30;
  const selectedSessionId = filters.session_id || "";

  const {
    data: sessionTrends = [],
    isLoading: isTrendsLoading,
    isError: isTrendsError,
    error: trendsError,
    refetch: refetchTrends,
  } = useSessionTrends(trendDays);

  const {
    data: sessionsData = [],
    isLoading: isSessionsLoading,
    isError: isSessionsError,
    error: sessionsError,
    refetch: refetchSessions,
    fetchNextPage,
    hasNextPage,
  } = useSessionsData();

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

  const handleRowClick = useCallback(
    (id: string) => {
      setFilters((prev) => ({
        ...prev,
        session_id: id, // sync to URL
      }));
    },
    [setFilters]
  );

  const closeDialog = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      session_id: "", // remove from URL when closed
    }));
  }, [setFilters]);

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
      <SessionsTable
        data={sessionsData}
        onRowClick={handleRowClick}
        isLoading={isSessionsLoading}
        isError={isSessionsError}
        error={sessionsError}
        refetch={refetchSessions}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />

      {/* session details dialog */}
      <SessionDetailsModal
        open={!!selectedSessionId}
        sessionId={selectedSessionId}
        onClose={closeDialog}
      />
    </div>
  );
};

export default UserSessions;
