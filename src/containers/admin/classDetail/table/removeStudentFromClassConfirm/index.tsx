import React from "react";

import { useParams } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { keys } from "src/api/class";
import { keys as userKeys } from "src/api/users";
import { Button } from "src/components/ui/button";
import { useRemoveStudentFromClass } from "src/queries/class/detail";

type Props = {
  setOpen: (v: boolean) => void;
  idStudent?: number;
  idsStudent?: number[];
  onSuccess?: () => void;
};

const RemoveStudentFromClassConfirm: React.FC<Props> = ({
  setOpen,
  idStudent,
  idsStudent,
  onSuccess,
}) => {
  const client = useQueryClient();
  const params = useParams();
  const classId = params?.id as unknown as number;

  const { mutate, isPending } = useRemoveStudentFromClass(classId, {
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: keys.getUsersInClass(classId),
      });
      await client.invalidateQueries({
        queryKey: userKeys.getList({
          page: 1,
          limit: 10,
          exclude_class_id: classId,
        }),
      });
      setOpen(false);
      onSuccess && onSuccess();
      toast.success("Remove student from class successfully");
    },
    onError: () => toast.error("Remove student from class failed"),
  });

  const onDelete = () =>
    mutate({
      user_ids: idStudent ? [idStudent] : idsStudent,
    });

  return (
    <div>
      <h2>
        Do you want to remove{" "}
        {idStudent
          ? "this student"
          : `${idsStudent?.length} ${idsStudent?.length > 1 ? "students" : "student"}`}{" "}
        from class ?
      </h2>
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

export default RemoveStudentFromClassConfirm;
