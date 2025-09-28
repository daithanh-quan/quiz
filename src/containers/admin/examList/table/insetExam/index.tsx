import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z, ZodType } from "zod";

import { keys } from "src/api/exams";
import { InputField } from "src/components/forms";
import { Button } from "src/components/ui/button";
import { useQuery } from "src/hooks/useQuery";
import { useCreateExam, useEditExam } from "src/queries/exam/detail";

export type FormValues = {
  name: string;
  description?: string;
};

const schema: ZodType<Partial<FormValues>> = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .nonempty("Name is required"),
  description: z.string().optional(),
});

type Props = {
  setOpen: (open: boolean) => void;
  defaultValues?: FormValues;
  id?: number;
};

const InsetExam: React.FC<Props> = ({ setOpen, defaultValues, id }) => {
  const client = useQueryClient();
  const query = useQuery();

  const { mutate: editClass, isPending: isPendingEdit } = useEditExam(id, {
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: keys.getList({
          page: query?.page || 1,
          limit: query?.limit || 10,
        }),
      });
      setOpen(false);
      toast.success("Update exam successfully");
    },
    onError: () => {
      toast.error("Update exam failed");
    },
  });

  const { mutate: createClass, isPending } = useCreateExam({
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: keys.getList({
          page: query?.page || 1,
          limit: query?.limit || 10,
        }),
      });
      toast.success("Create exam successfully");
      setOpen(false);
    },
    onError: () => {
      toast.error("Create exam failed");
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (defaultValues) {
      editClass(formValues);
      return;
    } else {
      createClass(formValues);
      return;
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          isRequired
          name="name"
          label="Exam Name"
          placeholder="Please enter exam name"
        />
        <InputField
          name="description"
          label="Description"
          placeholder="Please enter description"
        />
        <div className="flex items-center gap-2 pt-10">
          <Button
            disabled={isPending || isPendingEdit}
            className="flex-1"
            onClick={() => setOpen(false)}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending || isPendingEdit || !form?.formState?.isDirty}
            loading={isPending || isPendingEdit}
            className="flex-1"
          >
            {defaultValues ? "Save" : "Submit"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default InsetExam;
