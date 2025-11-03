import React, { useMemo } from "react";

import Link from "next/link";

import { CheckedState } from "@radix-ui/react-checkbox";
import { ColumnDef, Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Pencil, TrashIcon } from "lucide-react";

import { Checkbox } from "src/components/ui/checkbox";
import Modal from "src/components/ui/modal";
import DeleteConfirm from "src/containers/admin/classList/table/deleteConfirm";
import InsetClass from "src/containers/admin/classList/table/insetClass";

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
        header: "Class Name",
        cell: (props) => {
          const row = props.row as Row<Response.Classes>;

          return (
            <Link
              className="text-blue-500"
              href={`/admin/classes/${row.original.id}`}
            >
              {row.getValue("name")}
            </Link>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => row.getValue("description") || "-",
      },
      {
        accessorKey: "users",
        header: "Total Students",
        cell: ({ row }) => {
          const users = row.original as unknown as {
            users: Response.Student[];
          };

          return <p className="pl-10">{users?.users?.length || 0}</p>;
        },
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
            <div className="flex items-center justify-end gap-5">
              <Modal
                title="Delete Class"
                content={({ setOpen }) => (
                  <DeleteConfirm
                    idClass={row?.original?.id!}
                    setOpen={setOpen}
                  />
                )}
                trigger={
                  <TrashIcon className="h-4 w-4 cursor-pointer text-red-500" />
                }
              />
              <Modal
                title="Edit Class"
                content={({ setOpen }) => (
                  <InsetClass
                    id={row?.original?.id}
                    defaultValues={{
                      name: row?.original?.name,
                      description: row?.original?.description,
                    }}
                    setOpen={setOpen}
                  />
                )}
                trigger={
                  <Pencil className="h-4 w-4 cursor-pointer text-blue-500" />
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
