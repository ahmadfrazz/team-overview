import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { VisibilityState } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { ColumnVisibilityDropdownProps } from "@/types";

export const ColumnVisibilityDropdown = <TData,>({
  columns,
  columnVisibility,
  setColumnVisibility,
  className,
}: ColumnVisibilityDropdownProps<TData>) => {
  return (
    <div className={cn(className)}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <SlidersHorizontal className="w-4 h-4 mr-1" />
            Columns
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          {columns.map((col) => {
            const acck =
              "accessorKey" in col && typeof col.accessorKey === "string"
                ? col.accessorKey
                : "";
            const id = col.id ?? acck;

            const locked = col.enableHiding === false;

            return (
              <DropdownMenuCheckboxItem
                key={id}
                checked={columnVisibility[id] !== false}
                onCheckedChange={(checked) => {
                  if (!locked) {
                    setColumnVisibility((prev: VisibilityState) => ({
                      ...prev,
                      [id]: checked,
                    }));
                  }
                }}
                disabled={locked}
                title="Toggle Visibility"
                aria-label="Toggle Visibility"
              >
                {col.header as string}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
