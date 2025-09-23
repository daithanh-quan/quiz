import React from "react";

import { flexRender } from "@tanstack/react-table";
import { Inbox } from "lucide-react";

import { BodyTableProps, TableProps } from "src/components/tables/interface";
import { TableBody, TableCell, TableRow } from "src/components/ui/table";
import { cn } from "src/lib/utils";

// Skeleton component
const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
      className,
    )}
  />
);

type SkeletonConfig = {
  rows?: number;
  cellHeight?: string;
  cellWidths?: string[];
};

type Props<TData, TValue> = {} & BodyTableProps<TData, TValue> &
  Pick<
    TableProps,
    | "tableBodyClassName"
    | "tableRowClassName"
    | "tableCellClassName"
    | "isLoading"
  > & {
    skeleton?: SkeletonConfig;
  };

const Tbody = <TData, TValue>({
  table,
  columns,
  isLoading,
  tableRowClassName,
  tableBodyClassName,
  tableCellClassName,
  skeleton = {},
}: Props<TData, TValue>) => {
  const {
    rows: skeletonRows = 10,
    cellHeight = "h-6",
    cellWidths = [],
  } = skeleton;

  const renderSkeleton = () => {
    const defaultWidths = ["w-24", "w-32", "w-20", "w-28", "w-16"];

    return Array.from({ length: skeletonRows }).map((_, rowIndex) => (
      <TableRow key={`skeleton-${rowIndex}`} className={cn(tableRowClassName)}>
        {columns.map((column, colIndex) => {
          const width =
            cellWidths[colIndex] ||
            defaultWidths[colIndex % defaultWidths.length] ||
            "w-24";

          return (
            <TableCell
              key={`skeleton-cell-${rowIndex}-${colIndex}`}
              className={cn(tableCellClassName)}
            >
              <Skeleton className={cn(cellHeight, width)} />
            </TableCell>
          );
        })}
      </TableRow>
    ));
  };

  const renderEmptyState = () => (
    <TableRow className={cn(tableRowClassName)}>
      <TableCell
        colSpan={columns.length}
        className={cn("h-[500px] text-center", tableCellClassName)}
      >
        <div className="flex flex-wrap items-center justify-center">
          <div className="mb-4 flex justify-center">
            <Inbox className="h-10 w-10 text-gray-400" />
          </div>
          <div className="w-full text-center">No data</div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <TableBody className={cn(tableBodyClassName)}>
      {isLoading && renderSkeleton()}

      {!isLoading && table.getRowModel().rows?.length
        ? table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className={cn(tableRowClassName)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={cn(tableCellClassName)}>
                  {
                    flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    ) as React.ReactNode
                  }
                </TableCell>
              ))}
            </TableRow>
          ))
        : !isLoading && renderEmptyState()}
    </TableBody>
  );
};

export default Tbody;
