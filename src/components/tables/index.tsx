import React from "react";

import Tbody from "src/components/tables/tbody";
import { Table } from "src/components/ui/table";
import { cn } from "src/lib/utils";

import { DataTableProps, TableProps } from "./interface";
import Paginator from "./paginator";
import Thead from "./thead";
import useTable from "./useTable";

const CusTomTable = <TData, TValue>(
  {
    columns,
    data,
    paginator,
    wrapperClassName,
    tableHeaderClassName,
    tableRowClassName,
    tableHeadClassName,
    tableClassName,
    tableCellClassName,
    tableBodyClassName,
    ...rest
  }: DataTableProps<TData, TValue> & TableProps,
  ref: React.Ref<HTMLTableElement>,
) => {
  const { table } = useTable({
    data,
    columns,
    ...rest,
  });

  return (
    <div>
      <div
        className={cn(
          "relative overflow-x-auto rounded-md border",
          wrapperClassName,
        )}
      >
        <Table
          {...rest}
          ref={ref}
          className={cn(
            "w-full border-collapse overflow-x-auto",
            tableClassName,
          )}
        >
          <Thead
            table={table}
            tableHeadClassName={tableHeadClassName}
            tableRowClassName={tableRowClassName}
            tableHeaderClassName={tableHeaderClassName}
          />
          <Tbody
            {...rest}
            table={table}
            columns={columns}
            tableRowClassName={tableRowClassName}
            tableCellClassName={tableCellClassName}
            tableBodyClassName={tableBodyClassName}
          />
        </Table>
      </div>
      {!rest.isLoading && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length
              ? `${table.getFilteredSelectedRowModel().rows.length} of `
              : null}
            {table.getFilteredRowModel().rows.length} row(s)
          </div>
          <div className="flex justify-end">
            <Paginator
              currentPage={
                paginator
                  ? paginator.currentPage
                  : table.getState().pagination.pageIndex + 1
              }
              totalPages={
                paginator ? paginator.totalPages : table.getPageCount()
              }
              onPageChange={(pageNumber) =>
                paginator
                  ? paginator.onPageChange(pageNumber)
                  : table.setPageIndex(pageNumber - 1)
              }
              showPreviousNext={
                paginator ? (paginator.showPreviousNext as boolean) : true
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(CusTomTable);
