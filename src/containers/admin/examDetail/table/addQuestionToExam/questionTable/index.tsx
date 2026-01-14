"use client";

import React, { Fragment } from "react";

import { useParams } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { TableOptions } from "@tanstack/table-core";
import { PlusIcon, SaveIcon } from "lucide-react";
import { toast } from "sonner";

import { keys } from "src/api/exam";
import { QuestionListResponse, keys as questionsKey } from "src/api/questions";
import QuizForm from "src/components/questions/QuizForm";
import CusTomTable from "src/components/tables";
import { Button } from "src/components/ui/button";
import Modal from "src/components/ui/modal";
import { cn } from "src/lib/utils";
import { useAddQuestionsInExam } from "src/queries/exam/detail";
import { useGetListQuestion } from "src/queries/question/list";

import useColumn from "./useColumn";

const Table = () => {
  const params = useParams();
  const client = useQueryClient();

  const [page, setPage] = React.useState(1);

  const examId = params?.id as unknown as number;

  const { data, isLoading, isFetching } =
    useGetListQuestion<QuestionListResponse>(
      {
        page: page,
        limit: 10,
        exam_id: examId,
      },
      {
        enabled: !!examId,
      },
    );

  const [rowSelection, setRowSelection] = React.useState({});
  const { columns } = useColumn();
  const itemsSelected =
    Object.keys(rowSelection)?.map((item) => Number(item)) || [];

  return (
    <Fragment>
      <div
        className={cn("flex items-center justify-end", {
          "justify-between": itemsSelected.length > 0,
        })}
      >
        {itemsSelected.length > 0 && (
          <Modal
            isCloseIcon={true}
            content={({ setOpen }) => {
              const { mutate, isPending } = useAddQuestionsInExam({
                onSuccess: async () => {
                  await client.invalidateQueries({
                    queryKey: keys.getListQuestionInExam(examId),
                  });
                  await client.invalidateQueries({
                    queryKey: questionsKey.getList({
                      page: 1,
                      limit: 10,
                      exam_id: examId,
                    }),
                  });
                  setOpen(false);
                  setRowSelection({});
                  toast.success("Add questions to exam successfully");
                },
                onError: async () => {
                  setRowSelection({});
                  toast.error("Add questions to exam failed");
                },
              });

              return (
                <div>
                  <p className="text-center text-lg font-semibold">
                    Do you want to add {itemsSelected.length}{" "}
                    {itemsSelected.length > 1 ? "students" : "student"} to class
                    ?
                  </p>
                  <div className="mt-5 flex items-center gap-2">
                    <Button
                      disabled={isPending}
                      className="flex-1"
                      onClick={() => setOpen(false)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() =>
                        mutate({
                          id: examId,
                          data: {
                            question_ids: itemsSelected,
                          },
                        })
                      }
                      disabled={isPending}
                      loading={isPending}
                      className="flex-1"
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              );
            }}
            trigger={
              <Button
                iconPosition="left"
                icon={<SaveIcon className="h-4 w-4" />}
              >
                Save {itemsSelected.length}{" "}
                {itemsSelected.length > 1 ? "Questions" : "Question"}
              </Button>
            }
          />
        )}
        <Modal
          title="Add New Student"
          content={({ setOpen }) => <QuizForm />}
          trigger={
            <Button
              iconPosition="left"
              icon={<PlusIcon className="h-4 w-4 text-white" />}
            />
          }
        />
      </div>
      <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
        <CusTomTable
          data={data?.data?.questions || []}
          wrapperClassName="max-h-[450px] overflow-y-hidden"
          isLoading={isLoading || isFetching}
          paginator={{
            showPreviousNext: true,
            onPageChange: (pageNumber) => setPage(pageNumber),
            currentPage: data?.data?.pagination?.page || 1,
            totalPages: data?.data?.pagination?.totalPages || 1,
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
    </Fragment>
  );
};

export default Table;
