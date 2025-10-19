import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { keys } from "src/api/classes";
import { Button } from "src/components/ui/button";
import { useQuery } from "src/hooks/useQuery";
import { useDeleteClass } from "src/queries/class/detail";

type Props = {
  setOpen: (v: boolean) => void;
  idClass: number;
};

const DeleteConfirm: React.FC<Props> = ({ setOpen, idClass }) => {
  const client = useQueryClient();
  const query = useQuery();

  const { mutate, isPending } = useDeleteClass({
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: keys.getList({
          page: query?.page || 1,
          limit: query?.limit || 10,
        }),
      });
      setOpen(false);
      toast.success("Delete class successfully");
    },
    onError: () => toast.error("Delete class failed"),
  });

  const onDelete = () => mutate(idClass);

  return (
    <div>
      <h2>Do you want to delete this class ?</h2>
      <div className="flex items-center gap-2 pt-5">
        <Button
          disabled={isPending}
          className="flex-1"
          onClick={() => setOpen(false)}
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          onClick={onDelete}
          disabled={isPending}
          loading={isPending}
          className="flex-1 bg-red-500 hover:bg-red-700"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
