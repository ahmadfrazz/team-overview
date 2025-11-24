import { cn } from "@/lib/utils";
import { SingleSessionProp } from "@/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";

export const SingleSessionDetail = ({ data }: { data: SingleSessionProp }) => {
  const { feedback, transcript = [] } = data;

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: transcript.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
    measureElement:
      typeof window !== "undefined" && "IntersectionObserver" in window
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const paddingTop = virtualRows.length ? virtualRows[0].start : 0;
  const paddingBottom = virtualRows.length
    ? rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end
    : 0;

  // Build a map for the speakers
  const speakerMap = React.useMemo(() => {
    const map: Record<string, "A" | "B"> = {};

    for (const item of transcript) {
      if (!map[item.speaker]) {
        if (!Object.values(map).includes("A")) map[item.speaker] = "A";
        else map[item.speaker] = "B";
      }

      if (Object.keys(map).length === 2) break;
    }

    return map;
  }, [transcript]);

  return (
    <div className="space-y-6 flex flex-col">
      <div>
        <label htmlFor="feedback" className="text-sm text-muted-foreground">
          Feedback
        </label>
        <p className="text-sm">{feedback}</p>
      </div>

      <div
        ref={parentRef}
        className="space-y-3 overflow-y-auto max-h-[65dvh] bg-muted/30 rounded-md p-4"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        {transcript.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            No transcript available
          </div>
        ) : (
          <>
            {paddingTop > 0 && <div style={{ height: `${paddingTop}px` }} />}
            {virtualRows.map((virtualRow) => {
              const item = transcript[virtualRow.index];
              const speakerType = speakerMap[item.speaker];
              const isB = speakerType === "B";

              if (!item) return null;

              return (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  className="mb-3 last:mb-0"
                >
                  <p
                    key={virtualRow.index}
                    className={cn(
                      "bg-muted-foreground/15 py-2 px-3 rounded-lg rounded-br-none ml-auto mr-0 leading-5 w-fit max-w-80",
                      {
                        "bg-blue-500 text-white rounded-lg rounded-bl-none mr-auto ml-0":
                          isB,
                      }
                    )}
                  >
                    {item.text}
                  </p>
                </div>
              );
            })}
            {paddingBottom > 0 && (
              <div style={{ height: `${paddingBottom}px` }} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
