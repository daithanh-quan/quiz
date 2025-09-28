import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { keys } from "src/api/exams";
import { Button } from "src/components/ui/button";
import { useQuery } from "src/hooks/useQuery";
import { useDeleteExam } from "src/queries/exam/detail";

type Props = {
  setOpen: (v: boolean) => void;
  idExam: number;
};

const DeleteConfirm: React.FC<Props> = ({ setOpen, idExam }) => {
  const client = useQueryClient();
  const query = useQuery();

  const { mutate, isPending } = useDeleteExam({
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: keys.getList({
          page: query?.page || 1,
          limit: query?.limit || 10,
        }),
      });
      setOpen(false);
      toast.success("Delete exam successfully");
    },
    onError: () => toast.error("Delete exam failed"),
  });

  const onDelete = () => mutate(idExam);

  return (
    <div>
      <h2>Do you want to delete this exam ?</h2>
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
