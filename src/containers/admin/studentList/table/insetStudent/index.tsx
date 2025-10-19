import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z, ZodType } from "zod";

import { keys } from "src/api/users";
import { InputField } from "src/components/forms";
import { Button } from "src/components/ui/button";
import { useHistory } from "src/hooks/useHistory";
import { useQuery } from "src/hooks/useQuery";
import { useCreateUser, useUpdateProfile } from "src/queries/user/detail";

export type FormValues = {
  username: string;
  email: string;
  status: "pending" | "active";
  role: "client";
};

const schema: ZodType<Partial<FormValues>> = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .nonempty("Username is required"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Email is invalid"),
});

type Props = {
  setOpen: (open: boolean) => void;
  defaultValues?: Partial<FormValues>;
  id?: number;
  onSuccess?: () => void;
};

const InsetStudent: React.FC<Props> = ({
  setOpen,
  defaultValues,
  id,
  onSuccess,
}) => {
  const client = useQueryClient();
  const { reset } = useHistory();
  const query = useQuery();

  const { mutate: updateProfile, isPending: isPendingEdit } = useUpdateProfile(
    id,
    {
      onSuccess: async () => {
        !onSuccess &&
          (await client.invalidateQueries({
            queryKey: keys.getList({
              page: query?.page || 1,
              limit: query?.limit || 10,
            }),
          }));
        setOpen(false);
        reset();
        onSuccess && onSuccess?.();
        toast.success("Update student successfully");
      },
      onError: () => {
        toast.error("Update student failed");
      },
    },
  );

  const { mutate: createUser, isPending } = useCreateUser({
    onSuccess: async () => {
      !onSuccess &&
        (await client.invalidateQueries({
          queryKey: keys.getList({
            page: query?.page || 1,
            limit: query?.limit || 10,
          }),
        }));
      setOpen(false);
      onSuccess && onSuccess?.();
      toast.success("Create student successfully");
      reset();
    },
    onError: (e: Response.ErrorResponse) => {
      const isDuplicateUsername = e?.message.includes("username");

      toast.error(isDuplicateUsername ? "Username is duplicate" : e.message);
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
      updateProfile({
        ...formValues,
        status: defaultValues.status!,
      });
      return;
    } else {
      createUser({
        ...formValues,
        status: "active",
        role: "client",
      });
      return;
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {!defaultValues && (
          <InputField
            isRequired
            name="email"
            label="Email"
            placeholder="Please enter email"
          />
        )}
        <InputField
          isRequired
          name="username"
          label="Username"
          placeholder="Please enter username"
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

export default InsetStudent;
