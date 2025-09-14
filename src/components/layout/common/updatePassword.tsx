import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z, ZodType } from "zod";

import InputPwField from "src/components/forms/passwordField";
import { Button } from "src/components/ui/button";
import { useGetMe } from "src/queries/auth/me";
import { useUpdateProfile } from "src/queries/user/detail";

type FormValues = {
  newPassword: string;
  confirmPassword: string;
};

const schemaPassword: ZodType<Partial<FormValues>> = z
  .object({
    newPassword: z.string({}).nonempty("New password is required"),
    confirmPassword: z.string({}).nonempty("Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Props = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

const UpdatePassword: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const { data } = useGetMe<Response.Me>();
  const userId = data?.id;

  const formPassword = useForm<FormValues>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schemaPassword),
    mode: "onSubmit",
  });

  const { mutate, isPending } = useUpdateProfile(userId, {
    onSuccess: () => {
      toast.success("Update password successfully");
      onSuccess?.();
      onCancel?.();
    },
    onError: () => toast.error("Update password failed"),
  });

  const onSubmitPassword: SubmitHandler<FormValues> = (data) => {
    mutate({
      password: data.newPassword,
    });
  };

  return (
    <FormProvider {...formPassword}>
      <form
        onSubmit={formPassword.handleSubmit(onSubmitPassword)}
        className="space-y-5"
      >
        <InputPwField
          label="New Password"
          name="newPassword"
          placeholder="Please update new password"
        />
        <InputPwField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Please confirm new password"
        />
        <div className="flex justify-between gap-2 pt-5">
          <Button onClick={onCancel} variant="outline" className="flex-1">
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

export default UpdatePassword;
