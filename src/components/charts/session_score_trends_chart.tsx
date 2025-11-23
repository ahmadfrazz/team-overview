import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import NoData from "@/components/no-data/no-data";
import { TrendDays, TrendsChartProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import Retry from "../retry/retry";

const chartConfig = {
  trend: {
    label: "Session Score Trend",
  },
} satisfies ChartConfig;

export const SessionScoreTrendsChart = ({
  data,
  days,
  onDaysChange,
  isLoading,
  isError,
  error,
  refetch,
}: TrendsChartProps) => {
  return (
    <Card className="min-h-97">
      <div className="flex justify-between items-center px-6">
        <h3 className="font-bold">Session Score Trends</h3>
        <Select
          value={String(days)}
          onValueChange={(val) => onDaysChange(Number(val) as TrendDays)}
        >
          <SelectTrigger aria-label="Select a value" className="w-40">
            <div className="flex justify-between items-center w-full">
              <SelectValue placeholder="Select a value" />
              {isLoading && <Loader2 className="animate-spin h-5 w-5" />}
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="90">Last 3 months</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="my-auto flex items-center justify-center gap-2">
          <Loader2 className="animate-spin h-5 w-5" />
          Loading...
        </div>
      ) : isError ? (
        <Retry
          refetch={refetch}
          error={error}
          minimal={true}
          className="my-auto"
        />
      ) : data.length > 0 ? (
        <ChartContainer config={chartConfig} className="-translate-x-5 h-70">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => format(new Date(value), "d MMM")}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />

            <Line
              type="monotone"
              dataKey="avg_score"
              name="Avg. Score"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ChartContainer>
      ) : (
        <NoData />
      )}
    </Card>
  );
};
