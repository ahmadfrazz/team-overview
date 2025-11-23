import { Row } from "@tanstack/react-table";
import { AxiosError } from "axios";

export interface UserProps {
  user_id: string;
  first_name: string;
  team: string;
  total_sessions: number;
  avg_score: number;
  avg_confidence: number;
  avg_clarity: number;
  avg_listening: number;
  best_session_score: number;
  recent_trend: "improving" | "declining" | "stable";
}

export type InfoDataProps = {
  topThree: Array<Partial<UserProps>>;
  avgByTeam: {
    team: string;
    average_score: number;
  }[];
};

export type FiltersRowProps = {
  handleFilterChange: (filters: { name: string; team: string }) => void;
  teams: string[];
};

export interface TopPerformersProps {
  users: any[];
}

export interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user: any;
}

export interface ChartProps {
  data: { team: string; average_score: number }[];
}

export interface UserTableProps {
  data: any[];
  onUserClick: (id: string) => void;
}

export interface RetryProps {
  refetch: () => void;
  error?: AxiosError | Error | unknown;
  minimal?: boolean;
  className?: string;
}

export const filterKeyMap: Record<string, keyof UserProps> = {
  name: "first_name",
  team: "team",
};

export type DraggableRowProps<TData> = {
  row: Row<TData>;
  children: React.ReactNode;
};

export const map = {
  improving: "success",
  declining: "danger",
  stable: "warning",
} as const;
export type TrendKey = keyof typeof map;

export type TrendDays = 7 | 30 | 90;

export interface TrendsApiProps {
  date: string;
  avg_score: number;
  count: number;
}
[];
export interface TrendsChartProps {
  data: { date: string; avg_score: number; count: number }[];
  days: number;
  onDaysChange: (value: TrendDays) => void;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  refetch: () => void;
}
