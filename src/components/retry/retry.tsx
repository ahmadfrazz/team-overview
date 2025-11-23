import { Squirrel, RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import { RetryProps } from "@/types";
import { AxiosError } from "axios";
import { toast } from "sonner";

const Retry: React.FC<RetryProps> = ({ refetch, error }) => {
  const text = "Something is going crazy!";

  const err = error as AxiosError;
  const data = err?.response?.data as { error?: string } | undefined;
  toast.error(`Uhh.. ${err?.response?.status || "Unknown"} Error!`, {
    description: data?.error || text,
    action: {
      label: "Retry",
      onClick: () => refetch(),
    },
  });

  return (
    <div className="h-[70dvh] flex flex-col items-center justify-center gap-5">
      <Squirrel className="stroke-[0.3] size-30 sm:size-50" />
      <span className="text-foreground-muted font-mono">{text}</span>
      <Button onClick={() => refetch()} className="text-white font-mono">
        <RotateCw />
        Retry
      </Button>
    </div>
  );
};

export default Retry;
