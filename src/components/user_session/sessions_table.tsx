import { SessionProp, SessionsProps } from "@/types";
import { useMemo, useState } from "react";
import { DataTable } from "../table/data-table";
import { ColumnDef, VisibilityState } from "@tanstack/react-table";
import Retry from "../retry/retry";
import { Loader2 } from "lucide-react";
import { useInfiniteSessions } from "@/hooks/use_infinite_sessions";
import { ColumnVisibilityDropdown } from "../column_visibility_dropdown/column_visibility_dropdown";

const SessionsTable = ({
  data,
  onRowClick,
  isLoading,
  isError,
  error,
  refetch,
  fetchNextPage,
  hasNextPage,
}: SessionsProps) => {
  const { sessions, scrollRef } = useInfiniteSessions({
    data,
    fetchNextPage,
    hasNextPage,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = useMemo<ColumnDef<SessionProp>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ getValue }) => (
          <div className="min-w-max">{String(getValue())}</div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      { accessorKey: "score", header: "Score" },
      {
        accessorFn: (row) => row.metrics?.confidence,
        id: "confidence",
        header: "Confidence",
      },
      {
        accessorFn: (row) => row.metrics?.clarity,
        id: "clarity",
        header: "Clarity",
      },
      {
        accessorFn: (row) => row.metrics?.listening,
        id: "listening",
        header: "Listening",
      },
      { accessorKey: "duration", header: "Duration" },
    ],
    []
  );

  if (isLoading) {
    return (
      <div className="h-[80dvh] flex items-center justify-center gap-2">
        <Loader2 className="animate-spin h-5 w-5" />
        Loading...
      </div>
    );
  }

  if (!data?.pageParams && isError) {
    return <Retry refetch={refetch} error={error} />;
  }

  return (
    <div className="relative space-y-2">
      <ColumnVisibilityDropdown
        columns={columns}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        className="flex justify-end mb-2"
      />
      <DataTable
        data={sessions}
        columns={columns}
        parentRef={scrollRef}
        onRowClick={(user) => onRowClick(user.id)}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />

      {isError && (
        <Retry
          refetch={fetchNextPage}
          error={error}
          minimal
          className="absolute inset-0 flex justify-center items-center bg-background/90"
          showToast={false}
        />
      )}
    </div>
  );
};

export default SessionsTable;
