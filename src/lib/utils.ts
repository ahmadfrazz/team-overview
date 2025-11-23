import { UserProps } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const keys: (keyof UserProps)[] = [
  "user_id",
  "first_name",
  "team",
  "avg_score",
  "avg_confidence",
  "avg_clarity",
  "avg_listening",
  "total_sessions",
  "best_session_score",
  "recent_trend",
];
export function analyzeUsers(users: UserProps[]) {
  let topThree: UserProps[] = [];
  const teamStats: Record<string, { sum: number; count: number }> = {};

  for (const user of users) {
    // Update team stats
    const team = (teamStats[user.team] ??= { sum: 0, count: 0 });
    team.sum += user.avg_score;
    team.count += 1;

    // Maintain top 3 in place
    if (topThree.length < 3) {
      topThree.push(user);
      topThree.sort((a, b) => b.avg_score - a.avg_score);
    } else if (user.avg_score > topThree[2].avg_score) {
      topThree[2] = user;
      topThree.sort((a, b) => b.avg_score - a.avg_score);
    }
  }

  // Format topThree users
  const formattedTopThree = topThree.map((u) =>
    Object.fromEntries(
      keys.map((key) => [key, u[key] as UserProps[typeof key]])
    )
  );

  // Build average by team
  const avgByTeam = Object.entries(teamStats).map(([team, t]) => ({
    team,
    average_score: t.sum / t.count,
  }));

  return { topThree: formattedTopThree, avgByTeam };
}
