import React, { useMemo } from "react";

import { CheckedState } from "@radix-ui/react-checkbox";
import { ColumnDef, Row } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";

import { Checkbox } from "src/components/ui/checkbox";
import Modal from "src/components/ui/modal";
import RemoveQuestionFromExamConfirm from "src/containers/admin/examDetail/table/removeQuestionFromExamConfirm";

const useColumn = () => {
  const columns: ColumnDef<unknown, unknown>[] = useMemo(() => {
    return [
      {
        id: "select",
        size: 50,
        header: ({ table }) => (
          <Checkbox
            checked={
              table?.getIsAllPageRowsSelected() ||
              ((table?.getIsSomePageRowsSelected() &&
                "indeterminate") as CheckedState)
            }
            onCheckedChange={(value) =>
              table?.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
      },
      {
        accessorKey: "question_text",
        header: "Question Text",
        cell: ({ row }) => (
          <p className="line-clamp-2 max-w-[500px]">
            {row.getValue("question_text")}
          </p>
        ),
      },
      {
        accessorKey: "question_type",
        header: "Type",
        cell: ({ row }) => row.getValue("question_type") || "-",
      },
      {
        accessorKey: "answers",
        header: "Total Answers",
        cell: ({ row }) => {
          const exam = row.original as Response.Exam & {
            answers: Response.Answer[];
          };

          return <p>{exam?.answers?.length || 0}</p>;
        },
      },

      {
        accessorKey: "actions",
        header: "",
        cell: (props) => {
          const row = props.row as Row<Response.Question>;

          return (
            <div className="flex items-center justify-end gap-2">
              <Modal
                title="Remove Question From Exam"
                content={({ setOpen }) => (
                  <RemoveQuestionFromExamConfirm
                    idQuestion={row?.original?.id!}
                    setOpen={setOpen}
                  />
                )}
                trigger={
                  <TrashIcon className="h-4 w-4 cursor-pointer text-red-500" />
                }
              />
            </div>
          );
        },
      },
    ];
  }, []);

  return {
    columns,
  };
};

export default useColumn;
