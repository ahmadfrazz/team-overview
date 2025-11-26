import { ColumnDef, Row, VisibilityState } from "@tanstack/react-table";
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
  users: UserProps[];
}

export interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user: UserProps;
}

export interface ChartProps {
  data: { team: string; average_score: number }[];
}

export interface UserTableProps {
  data: UserProps[];
  onUserClick: (id: string) => void;
}

export interface RetryProps {
  refetch: () => void;
  error?: AxiosError | Error | unknown;
  minimal?: boolean;
  className?: string;
  showToast?: boolean;
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

export interface TrendsChartProps {
  data: { date: string; avg_score: number; count: number }[];
  days: number;
  onDaysChange: (value: TrendDays) => void;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  refetch: () => void;
}

// sessions props
export interface SessionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: SessionScrollPageProps | any;
  onRowClick: (id: string) => void;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  refetch: () => void;
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
}
export type SessionMetricsProp = {
  confidence: number;
  clarity: number;
  listening: number;
};
export type SessionProp = {
  id: string;
  user_id: string;
  title: string;
  score: number;
  metrics: SessionMetricsProp;
  created_at: string;
  duration: number;
};
export type SessionApiResponseProp = {
  sessions: SessionProp[];
  total: number;
  page: number;
  pageSize: number;
};

export type SessionScrollPageProps = {
  pageParams: number[];
  pages: SessionApiResponseProp[];
};

export type InfiniteQueryData = {
  pages: SessionApiResponseProp[];
  pageParams: unknown[];
};

export type UseInfiniteSessionsProps = {
  data: InfiniteQueryData | undefined;
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean | undefined;
};

export type SingleSessionProp = {
  id: string;
  user_id: string;
  feedback: string;
  transcript: {
    text: string;
    secondsFromStart: number;
    speaker: string;
  }[];
};

export type ColumnVisibilityDropdownProps<TData> = {
  columns: ColumnDef<TData>[];
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
  className?: string;
};
