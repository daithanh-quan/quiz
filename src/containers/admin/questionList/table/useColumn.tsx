import React, { useMemo } from "react";

import { CheckedState } from "@radix-ui/react-checkbox";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Pencil, TrashIcon } from "lucide-react";

import { Button } from "src/components/ui/button";
import { Checkbox } from "src/components/ui/checkbox";
import Modal from "src/components/ui/modal";
import DeleteConfirm from "src/containers/admin/examList/table/deleteConfirm";
import InsetExam from "src/containers/admin/examList/table/insetExam";

const useColumn = () => {
  const columns: ColumnDef<unknown, unknown>[] = useMemo(() => {
    return [
      {
        id: "select",
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
        header: "Question Name",
        cell: ({ row }) => (
          <div className="line-clamp-1 max-w-[300px]">
            {row.getValue("question_text") || "-"}
          </div>
        ),
      },
      {
        accessorKey: "question_type",
        header: "Type",
      },
      {
        accessorKey: "exam",
        header: "Exam",
        cell: (props) => {
          const row = props.row as Row<Response.Question>;

          return <div>{row?.original?.exam?.name || "-"}</div>;
        },
      },
      {
        accessorKey: "answer",
        header: "Answer",
        cell: (props) => {
          const row = props.row as Row<Response.Question>;
          const answers = row?.original?.answers || [];

          return <div>{answers?.length}</div>;
        },
      },
      {
        accessorKey: "actions",
        header: "",
        cell: (props) => {
          const row = props.row as Row<Response.Classes>;

          return (
            <div className="flex items-center justify-end gap-2">
              <Modal
                title="Delete Class"
                content={({ setOpen }) => (
                  <DeleteConfirm
                    idExam={row?.original?.id!}
                    setOpen={setOpen}
                  />
                )}
                trigger={
                  <Button variant="delete">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                }
              />
              <Modal
                title="Edit Exam"
                content={({ setOpen }) => (
                  <InsetExam
                    id={row?.original?.id}
                    defaultValues={{
                      name: row?.original?.name,
                      description: row?.original?.description,
                    }}
                    setOpen={setOpen}
                  />
                )}
                trigger={
                  <Button variant="default">
                    <Pencil className="h-4 w-4" />
                  </Button>
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
