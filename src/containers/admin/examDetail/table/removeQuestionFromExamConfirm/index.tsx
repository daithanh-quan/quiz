import React from "react";

import { useParams } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { keys } from "src/api/exam";
import { keys as questionsKey } from "src/api/questions";
import { Button } from "src/components/ui/button";
import { useRemoveQuestionsInExam } from "src/queries/exam/detail";

type Props = {
  setOpen: (v: boolean) => void;
  idQuestion?: number;
  idsStudent?: number[];
  idsQuestion?: number[];
  onSuccess?: () => void;
};

const RemoveQuestionFromExamConfirm: React.FC<Props> = ({
  setOpen,
  idQuestion,
  idsQuestion,
  onSuccess,
}) => {
  const client = useQueryClient();
  const params = useParams();
  const examId = params?.id as unknown as number;

  const { mutate, isPending } = useRemoveQuestionsInExam({
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
      onSuccess && onSuccess();
      toast.success("Remove question from exam successfully");
    },
    onError: () => toast.error("Remove question from exam failed"),
  });

  const onDelete = () =>
    mutate({
      id: examId,
      data: {
        question_ids: idQuestion ? [idQuestion] : idsQuestion,
      },
    });

  return (
    <div>
      <h2>
        Do you want to remove{" "}
        {idQuestion
          ? "this student"
          : `${idsQuestion?.length} ${idsQuestion?.length > 1 ? "students" : "student"}`}{" "}
        from exam ?
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

export default RemoveQuestionFromExamConfirm;
