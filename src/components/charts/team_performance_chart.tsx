import { BarChart, Bar, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import NoData from "@/components/no-data/no-data";
import { ChartProps } from "@/types";

const chartConfig = {
  team: {
    label: "Avg. Score",
  },
} satisfies ChartConfig;

export const TeamPerformanceChart = ({ data }: ChartProps) => {
  if (data.length === 0) {
    return (
      <Card>
        <NoData />
      </Card>
    );
  }
  return (
    <Card className="gap-0">
      <h3 className="font-bold text-center mb-3">Team's Avg. Score</h3>
      <ChartContainer config={chartConfig} className="-translate-x-5">
        <BarChart data={data}>
          <XAxis dataKey="team" />
          <YAxis />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar
            dataKey="average_score"
            name="Avg. Score"
            fill="var(--primary)"
            barSize={20}
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
};
