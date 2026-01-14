import React, { useMemo } from "react";

import { CheckedState } from "@radix-ui/react-checkbox";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { Checkbox } from "src/components/ui/checkbox";

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
        header: "Name question",
        cell: ({ row }) => (
          <p className="line-clamp-2">{row.getValue("question_text")}</p>
        ),
      },
      {
        accessorKey: "question_type",
        header: "Type",
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) =>
          row.getValue("created_at")
            ? dayjs(row.getValue("created_at")).format("DD/MM/YYYY")
            : "-",
      },
    ];
  }, []);

  return {
    columns,
  };
};

export default useColumn;
