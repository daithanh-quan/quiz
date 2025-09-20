import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z, ZodType } from "zod";

import { InputField } from "src/components/forms";
import { Button } from "src/components/ui/button";
import { useGetMe } from "src/queries/auth/me";
import { useUpdateProfile } from "src/queries/user/detail";

type FormValues = {
  username: string;
};

const schema: ZodType<Partial<FormValues>> = z.object({
  username: z.string({}).nonempty("Username is required"),
});

type Props = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

const UpdateUsername: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const { data, refetch } = useGetMe<Response.Me>();
  const userId = data?.id;

  const formPassword = useForm<FormValues>({
    defaultValues: {
      username: data?.username,
    },
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const { mutate, isPending } = useUpdateProfile(userId, {
    onSuccess: async () => {
      await refetch();
      toast.success("Update username successfully");
      onSuccess?.();
      onCancel?.();
    },
    onError: () => toast.error("Update username failed"),
  });

  const onSubmitPassword: SubmitHandler<FormValues> = (data) => {
    mutate({
      username: data.username,
    });
  };

  return (
    <FormProvider {...formPassword}>
      <form
        onSubmit={formPassword.handleSubmit(onSubmitPassword)}
        className="space-y-5"
      >
        <InputField
          label="Username"
          name="username"
          placeholder="Please update username"
        />
        <div className="flex justify-between gap-2 pt-5">
          <Button
            type="button"
            disabled={isPending}
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            loading={isPending}
            type="submit"
            className="flex-1"
            disabled={!formPassword?.formState?.isDirty}
          >
            Update
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateUsername;
