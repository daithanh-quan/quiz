"use client";

import React from "react";

import { useParams } from "next/navigation";

import { useIsMutating } from "@tanstack/react-query";
import { TableOptions } from "@tanstack/table-core";
import { PlusIcon, TrashIcon } from "lucide-react";

import { ListQuestionInExamResponse } from "src/api/exam";
import CusTomTable from "src/components/tables";
import { Button } from "src/components/ui/button";
import Modal from "src/components/ui/modal";
import AddQuestionToExam from "src/containers/admin/examDetail/table/addQuestionToExam";
import { useGetListQuestionInExam } from "src/queries/exam/detail";

import RemoveQuestionFromExamConfirm from "./removeQuestionFromExamConfirm";
import useColumn from "./useColumn";

const Table = () => {
  const isMutating = useIsMutating();
  const params = useParams();
  const examId = params?.id as unknown as number;

  const { data, isLoading } =
    useGetListQuestionInExam<ListQuestionInExamResponse>(examId, {
      retry: false,
    });

  const [rowSelection, setRowSelection] = React.useState({});
  const { columns } = useColumn();
  const itemsSelected: number[] =
    Object.keys(rowSelection)?.map((item) => Number(item)) || [];

  return (
    <div className="mt-5 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold italic"> Questions In Exam</h2>
        <div className="flex items-center gap-2">
          {itemsSelected.length > 0 && (
            <Modal
              title="Remove Student From Class"
              content={({ setOpen }) => (
                <RemoveQuestionFromExamConfirm
                  idsStudent={itemsSelected}
                  setOpen={setOpen}
                  onSuccess={() => setRowSelection({})}
                />
              )}
              trigger={
                <Button
                  variant="delete"
                  icon={<TrashIcon className="h-4 w-4" />}
                  iconPosition="left"
                >
                  Remove {itemsSelected.length}
                  {itemsSelected.length > 1 ? " Questions" : " Question"}
                </Button>
              }
            />
          )}
          <Modal
            closeOutSide={!!isMutating}
            title="Add Question In Exam"
            size="xl"
            content={({ setOpen }) => <AddQuestionToExam />}
            trigger={
              <Button
                iconPosition="left"
                icon={<PlusIcon className="h-4 w-4 text-white" />}
              >
                Add Question In Exam
              </Button>
            }
          />
        </div>
      </div>
      <CusTomTable
        data={data?.data || []}
        wrapperClassName="max-h-[450px] overflow-y-hidden"
        isLoading={isLoading}
        paginator={null}
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
