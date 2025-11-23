import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DECIMALS_POINTS } from "@/constants";
import NoData from "../no-data/no-data";
import { TopPerformersProps } from "@/types";

export const TopPerformersList = ({ users }: TopPerformersProps) => {
  if (users.length === 0) {
    return (
      <Card>
        <NoData />
      </Card>
    );
  }
  return (
    <>
      <Card>
        <h3 className="font-bold text-center">Top {users.length} Performers</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Avg. Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const { first_name, team, avg_score } = user;
              return (
                <TableRow key={first_name}>
                  <TableCell>{first_name}</TableCell>
                  <TableCell>{team}</TableCell>
                  <TableCell>{avg_score.toFixed(DECIMALS_POINTS)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};
