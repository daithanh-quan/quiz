"use client";

import React from "react";

import { useIsMutating } from "@tanstack/react-query";
import { TableOptions } from "@tanstack/table-core";
import { PlusIcon } from "lucide-react";

import { ClassesListResponse } from "src/api/classes";
import CusTomTable from "src/components/tables";
import { Button } from "src/components/ui/button";
import Modal from "src/components/ui/modal";
import { useQuery } from "src/hooks/useQuery";
import { useGetListClass } from "src/queries/class/list";

import InsetClass from "./insetClass";
import useColumn from "./useColumn";

const Table = () => {
  const isMutating = useIsMutating();
  const query = useQuery();
  const { data, isLoading } = useGetListClass<ClassesListResponse>(
    {
      page: 1,
      limit: 10,
      name: query?.search || "",
    },
    {
      retry: false,
    },
  );

  const [rowSelection, setRowSelection] = React.useState({});
  const { columns } = useColumn();

  return (
    <div className="mt-5 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex justify-end">
        <Modal
          closeOutSide={!!isMutating}
          title="Add Class"
          content={({ setOpen }) => <InsetClass setOpen={setOpen} />}
          trigger={
            <Button
              iconPosition="left"
              icon={<PlusIcon className="h-4 w-4 text-white" />}
            >
              Add Class
            </Button>
          }
        />
      </div>
      <CusTomTable
        data={data?.data || []}
        wrapperClassName="max-h-[450px] overflow-y-hidden"
        isLoading={isLoading}
        paginator={{
          showPreviousNext: true,
          onPageChange: () => {},
          currentPage: data?.pagination?.page || 1,
          totalPages: data?.pagination?.totalPages || 1,
        }}
        columns={columns}
        options={
          {
            state: {
              rowSelection,
            },
            onRowSelectionChange: setRowSelection,
          } as TableOptions<any>
        }
      />
    </div>
  );
};

export default Table;
