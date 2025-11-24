import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  Row,
  getSortedRowModel,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { ArrowDown, ArrowUp, GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type DraggableRowProps<TData> = {
  row: Row<TData>;
  children: React.ReactNode;
};

type GenericTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  onRowClick?: (row: TData) => void;
  draggableRows?: boolean;
  parentRef?: React.RefObject<HTMLDivElement | null>;
};

const DraggableRow = <TData,>({ row, children }: DraggableRowProps<TData>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: row.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="cursor-pointer"
    >
      <TableCell
        {...listeners}
        className="w-6 cursor-grab text-muted-foreground"
      >
        <GripHorizontal size={15} />
      </TableCell>
      {children}
    </TableRow>
  );
};

export function DataTable<TData extends { id: string }>({
  data,
  columns,
  onRowClick,
  draggableRows = false,
  parentRef,
  columnVisibility: externalColumnVisibility,
  onColumnVisibilityChange,
}: GenericTableProps<TData> & {
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: (updater: VisibilityState) => void;
}) {
  const [rows, setRows] = useState(data);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  useEffect(() => {
    if (externalColumnVisibility) {
      setColumnVisibility(externalColumnVisibility);
    }
  }, [externalColumnVisibility]);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting, columnVisibility },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: (updater) => {
      setColumnVisibility(updater);
      onColumnVisibilityChange?.(
        typeof updater === "function" ? updater(columnVisibility) : updater
      );
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = table
      .getRowModel()
      .rows.findIndex((r) => r.id === active.id);
    const newIndex = table
      .getRowModel()
      .rows.findIndex((r) => r.id === over.id);

    setRows(arrayMove(rows, oldIndex, newIndex));
  };

  const internalRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = parentRef ?? internalRef;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 42,
    overscan: 8,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const paddingTop = virtualRows.length ? virtualRows[0].start : 0;
  const paddingBottom = virtualRows.length
    ? rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end
    : 0;

  const tableContent = (
    <Table>
      <TableHeader className="sticky top-0 z-20 bg-background">
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {draggableRows && <TableHead className="w-6" />}
            {group.headers.map((header) => {
              const canSort = header.column.getCanSort();
              const sorted = header.column.getIsSorted();
              const isAsc = sorted === "asc";
              const isDesc = sorted === "desc";
              return (
                <TableHead
                  key={header.id}
                  className={cn("min-w-32 w-32", {
                    "cursor-pointer select-none": canSort,
                  })}
                  onClick={
                    canSort
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                >
                  <div className="flex items-center gap-1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                    {canSort && (
                      <>
                        {isAsc && <ArrowUp className="text-primary size-4" />}
                        {isDesc && (
                          <ArrowDown className="text-primary size-4" />
                        )}
                      </>
                    )}
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {paddingTop > 0 && (
          <tr>
            <td style={{ height: paddingTop }} />
          </tr>
        )}

        {draggableRows ? (
          <SortableContext
            items={table.getRowModel().rows.map((r) => r.id)}
            strategy={verticalListSortingStrategy}
          >
            {virtualRows.map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];
              return (
                <DraggableRow key={row.id} row={row}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      onClick={() => onRowClick?.(row.original)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </DraggableRow>
              );
            })}
          </SortableContext>
        ) : (
          virtualRows.map((virtualRow) => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              <TableRow key={row.id} className="cursor-pointer">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        )}

        {paddingBottom > 0 && (
          <tr>
            <td style={{ height: paddingBottom }} />
          </tr>
        )}
      </TableBody>
    </Table>
  );

  return draggableRows ? (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToParentElement]}
      onDragEnd={onDragEnd}
    >
      <div
        ref={scrollRef}
        className="h-[400px] rounded-md border overflow-auto relative"
      >
        {tableContent}
        {rows.length === 0 && (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            No record found
          </p>
        )}
      </div>
    </DndContext>
  ) : (
    <div
      ref={scrollRef}
      className="h-[400px] rounded-md border overflow-auto relative"
    >
      {tableContent}
      {rows.length === 0 && (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground text-sm">
          No record found
        </p>
      )}
    </div>
  );
}
