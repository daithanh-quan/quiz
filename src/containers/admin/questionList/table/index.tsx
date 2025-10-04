"use client";

import React from "react";

import { useIsMutating } from "@tanstack/react-query";
import { TableOptions } from "@tanstack/table-core";
import { PlusIcon } from "lucide-react";

import { QuestionListResponse } from "src/api/questions";
import CusTomTable from "src/components/tables";
import { Button } from "src/components/ui/button";
import Modal from "src/components/ui/modal";
import { useGetListQuestion } from "src/queries/question/list";

import InsetExam from "./insetExam";
import useColumn from "./useColumn";

const Table = () => {
  const isMutating = useIsMutating();
  const { data, isLoading } = useGetListQuestion<QuestionListResponse>(
    {
      page: 1,
      limit: 10,
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
          title="Add Exam"
          content={({ setOpen }) => <InsetExam setOpen={setOpen} />}
          trigger={
            <Button
              iconPosition="left"
              icon={<PlusIcon className="h-4 w-4 text-white" />}
            >
              Add Question
            </Button>
          }
        />
      </div>
      <CusTomTable
        data={data?.data?.questions || []}
        wrapperClassName="max-h-[450px] overflow-y-hidden"
        isLoading={isLoading}
        paginator={{
          showPreviousNext: true,
          onPageChange: () => {},
          currentPage: data?.data.pagination?.page || 1,
          totalPages: data?.data.pagination?.totalPages || 1,
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
