import React, { useMemo } from "react";

import { useParams } from "next/navigation";

import { CheckedState } from "@radix-ui/react-checkbox";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef, Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import { toast } from "sonner";

import { keys } from "src/api/users";
import { Checkbox } from "src/components/ui/checkbox";
import { Switch } from "src/components/ui/switch";
import { useQuery } from "src/hooks/useQuery";
import { useChangeStatus } from "src/queries/user/detail";

const useColumn = () => {
  const query = useQuery();
  const params = useParams();

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
        accessorKey: "username",
        header: "Name Student",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (props) => {
          const row = props.row as Row<Response.Me>;
          const client = useQueryClient();

          const { mutate, isPending } = useChangeStatus(row?.original?.id!, {
            onSuccess: async () => {
              await client.invalidateQueries({
                queryKey: keys.getList({
                  page: query?.page || 1,
                  limit: query?.limit || 10,
                  exclude_class_id: params?.id as unknown as number,
                }),
              });
              toast.success("Change status successfully");
            },
            onError: () => {
              toast.error("Change status failed");
            },
          });

          return (
            <Switch
              loading={isPending}
              onCheckedChange={(value) => {
                mutate({
                  status: value ? "active" : "pending",
                });
              }}
              checked={row.original.status === "active"}
            />
          );
        },
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) =>
          dayjs(row.getValue("created_at")).format("DD/MM/YYYY"),
      },
    ];
  }, []);

  return {
    columns,
  };
};

export default useColumn;
