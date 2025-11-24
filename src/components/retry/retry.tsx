import { Squirrel, RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import { RetryProps } from "@/types";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const Retry: React.FC<RetryProps> = ({
  refetch,
  error,
  minimal = false,
  className,
  showToast = true,
}) => {
  const text = "Something is going crazy!";

  const err = error as AxiosError;
  const data = err?.response?.data as { error?: string } | undefined;

  useEffect(() => {
    if (!error) return;
    if (showToast) {
      toast.error(`Uhh.. ${err?.response?.status || "Unknown"} Error!`, {
        description: data?.error || text,
      });
    }
  }, [error]);

  return (
    <div
      className={cn(
        "h-[70dvh] flex flex-col items-center justify-center gap-5",
        {
          "h-auto gap-3": minimal,
        },
        className
      )}
    >
      {!minimal && <Squirrel className="stroke-[0.3] size-30 sm:size-50" />}
      <span className="text-foreground-muted font-mono">{text}</span>
      <Button onClick={() => refetch()} className="text-white font-mono">
        <RotateCw />
        Retry
      </Button>
    </div>
  );
};

export default Retry;
