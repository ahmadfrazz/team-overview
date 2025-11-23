import { useMemo } from "react";
import { DataTable } from "../table/data-table";
import { map, TrendKey, UserProps, UserTableProps } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DECIMALS_POINTS } from "@/constants";
import { Badge } from "../ui/badge";

export const UserTable = ({ data, onUserClick }: UserTableProps) => {
  const columns = useMemo<ColumnDef<UserProps>[]>(
    () => [
      { accessorKey: "first_name", header: "Name" },
      { accessorKey: "team", header: "Team" },
      { accessorKey: "total_sessions", header: "Total Sessions" },
      {
        accessorKey: "avg_score",
        header: "Avg. Score",
        cell: ({ getValue }) => Number(getValue()).toFixed(DECIMALS_POINTS),
      },
      {
        accessorKey: "recent_trend",
        header: "Recent Trend",
        cell: ({ getValue }) => {
          const trend = String(getValue()).toLowerCase();
          return (
            <Badge
              variant={map[trend as TrendKey] ?? "default"}
              className="capitalize"
            >
              {trend}
            </Badge>
          );
        },
      },
    ],
    []
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      onRowClick={(user) => onUserClick(user.user_id)}
      draggableRows
    />
  );
};
