import { useCallback, useEffect, useRef, useState } from "react";
import { SessionProp, UseInfiniteSessionsProps } from "@/types";

export function useInfiniteSessions({
  data,
  fetchNextPage,
  hasNextPage,
}: UseInfiniteSessionsProps) {
  const [sessions, setSessions] = useState<SessionProp[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const fetchingRef = useRef(false);
  const throttle = useRef<NodeJS.Timeout | null>(null);

  // Merge all pages only when data changes
  useEffect(() => {
    if (!data?.pages) return;
    const merged = data.pages.flatMap((p) => p.sessions);
    setSessions(merged);
  }, [data]);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (throttle.current) return;

    throttle.current = setTimeout(() => {
      throttle.current = null;

      const threshold = 200;
      const nearBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

      if (nearBottom && hasNextPage && !fetchingRef.current) {
        fetchingRef.current = true;
        fetchNextPage().finally(() => {
          fetchingRef.current = false;
        });
      }
    }, 200);
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return {
    sessions,
    scrollRef,
  };
}
