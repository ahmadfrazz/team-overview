import { useMemo } from "react";
import { useUserPerformance } from "@/hooks/use_user_performance";
import { UserTable } from "@/components/team_overview/user_table";
import { TeamPerformanceChart } from "@/components/charts/team_performance_chart";
import { TopPerformersList } from "@/components/team_overview/top_performers_list";
import { UserModal } from "@/components/modals/user_modal";
import { useUrlSync } from "@/hooks/use_url_sync";
import FiltersRow from "@/components/team_overview/filters-row";
import { Loader2 } from "lucide-react";
import { analyzeUsers } from "@/lib/utils";
import { UserProps, InfoDataProps, filterKeyMap } from "@/types";
import Retry from "@/components/retry/retry";

const UserOverview = () => {
  const {
    data: userPerformance = [],
    isLoading: isPerfLoading,
    isError,
    error,
    refetch,
  } = useUserPerformance();

  const { modalUserId, setModalUserId, filters, setFilters } = useUrlSync({
    name: "",
    team: "all",
  });

  const userMap = useMemo(() => {
    const map = new Map<string, UserProps>();
    userPerformance.forEach((u: UserProps) => map.set(u.user_id, u));
    return map;
  }, [userPerformance]);

  const filteredUsers = useMemo(() => {
    return userPerformance.filter((user: UserProps) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value || (key === "team" && value === "all")) return true;

        const userPropKey = filterKeyMap[key];
        if (!userPropKey) return true;

        const userValue = user[userPropKey];
        return (
          typeof userValue === "string" &&
          userValue.toLowerCase().includes(value.trim().toLowerCase())
        );
      })
    );
  }, [userPerformance, filters]);

  const infoData: InfoDataProps = useMemo(
    () => analyzeUsers(filteredUsers),
    [filteredUsers]
  );

  const selectedUser = modalUserId ? userMap.get(modalUserId) : undefined;

  const teams: string[] = useMemo(
    () =>
      Array.from(new Set(userPerformance.map((user: UserProps) => user.team))),
    [userPerformance]
  );

  if (isPerfLoading) {
    return (
      <div className="h-[80dvh] flex items-center justify-center gap-2">
        <Loader2 className="animate-spin h-5 w-5" />
        Loading...
      </div>
    );
  }

  if (isError) {
    return <Retry refetch={refetch} error={error} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid items-stretch gap-6 grid-cols-1 sm:grid-cols-2">
        <TopPerformersList users={infoData.topThree} />
        <TeamPerformanceChart data={infoData.avgByTeam} />
      </div>

      <FiltersRow
        handleFilterChange={({ name, team }) => {
          setFilters({ name, team });
        }}
        teams={teams}
        initialName={filters.name}
        initialTeam={filters.team}
      />

      <UserTable data={filteredUsers} onUserClick={setModalUserId} />

      <UserModal
        open={!!modalUserId}
        onClose={() => setModalUserId(null)}
        user={selectedUser}
      />
    </div>
  );
};

export default UserOverview;
