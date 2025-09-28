import React, { useMemo } from "react";

import { CheckedState } from "@radix-ui/react-checkbox";
import { ColumnDef, Row } from "@tanstack/react-table";
import dayjs from "dayjs";
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
        accessorKey: "name",
        header: "Exam Name",
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => row.getValue("description") || "-",
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) =>
          dayjs(row.getValue("created_at")).format("DD/MM/YYYY"),
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        cell: ({ row }) =>
          row.getValue("updated_at")
            ? dayjs(row.getValue("updated_at")).format("DD/MM/YYYY")
            : "-",
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
