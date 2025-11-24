import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSingleSession } from "@/hooks/use_single_session";
import { Loader2 } from "lucide-react";
import Retry from "../retry/retry";
import { SingleSessionDetail } from "../user_session/single_session_detail";

interface Props {
  open: boolean;
  sessionId: string;
  onClose: () => void;
}

const SessionDetailsModal = ({ open, sessionId, onClose }: Props) => {
  const {
    data = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useSingleSession(sessionId, open);

  return (
    <Dialog open={open} onOpenChange={(state) => !state && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-w-[calc(100%-32px)] max-h-[calc(100vh-32px)]">
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="min-h-40 flex items-center justify-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" />
            Loading...
          </div>
        ) : isError ? (
          <Retry refetch={refetch} error={error} />
        ) : (
          <SingleSessionDetail data={data} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SessionDetailsModal;
