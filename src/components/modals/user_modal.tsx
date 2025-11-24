import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DECIMALS_POINTS } from "@/constants";
import { map, TrendKey, UserModalProps } from "@/types";
import { Badge } from "../ui/badge";

export const UserModal = ({ open, onClose, user }: UserModalProps) => {
  const fields = [
    { key: "first_name", label: "Name" },
    { key: "team", label: "Team" },
    { key: "total_sessions", label: "Total Sessions" },
    { key: "avg_score", label: "Average Score" },
    { key: "avg_confidence", label: "Average Confidence" },
    { key: "avg_clarity", label: "Average Clarity" },
    { key: "avg_listening", label: "Average Listening" },
    { key: "best_session_score", label: "Best Session Score" },
    { key: "recent_trend", label: "Recent Trend" },
  ];
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user?.first_name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          <>
            {fields.map(({ key, label }) => {
              const value = user?.[key];

              const formatted =
                typeof value === "number"
                  ? value.toFixed(DECIMALS_POINTS)
                  : value;
              return (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="text-sm text-muted-foreground"
                  >
                    {label}
                  </label>
                  {key === "recent_trend" ? (
                    <div>
                      <Badge
                        variant={map[formatted as TrendKey] ?? "default"}
                        className="capitalize"
                      >
                        {formatted}
                      </Badge>
                    </div>
                  ) : (
                    <p className="text-sm">{formatted}</p>
                  )}
                </div>
              );
            })}
          </>
        </div>
      </DialogContent>
    </Dialog>
  );
};
