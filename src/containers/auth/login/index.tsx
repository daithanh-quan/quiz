"use client";

import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { ErrorResponse } from "src/api/baseAxios/interfaces";
import { InputField } from "src/components/forms";
import InputPwField from "src/components/forms/passwordField";
import { Button } from "src/components/ui/button";
import { CardContent } from "src/components/ui/card";
import cookie from "src/lib/cookie";
import { useSignIn } from "src/queries/auth/login";
import { useGetMe } from "src/queries/auth/me";
import { routerRole } from "src/utils";

const schema = z.object({
  email: z
    .string({
      message: "Username is required",
    })
    .nonempty("Username is required")
    .email("Invalid email"),
  password: z
    .string({
      message: "Username is required",
    })
    .nonempty("Password is required"),
});

export type FormValues = z.infer<typeof schema>;

const LoginContainer = () => {
  const router = useRouter();
  const { refetch } = useGetMe({
    enabled: false,
  });

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const { mutate, isPending } = useSignIn({
    onSuccess: async (data) => {
      cookie.setToken(data?.access_token);
      await refetch()
        .then((res) => {
          const data = res.data as Response.Me;

          router.push(routerRole[data.role]);
          cookie.setRole(data.role);

          return;
        })
        .catch((e) => {
          router.push("/");
        });
    },
    onError: (error: ErrorResponse) => {
      toast.error(error?.message || "Login failed");
    },
  });

  const handleCredentialLogin: SubmitHandler<FormValues> = async (v) => {
    const { email, password } = v;
    const payload = { email, password };
    mutate(payload);
  };

  return (
    <CardContent>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleCredentialLogin)}>
          <div className="space-y-2">
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="my-5">
            <div className="flex items-center justify-between">
              <label htmlFor="password">Password</label>
            </div>
            <InputPwField
              name="password"
              placeholder="Please enter your password"
            />
          </div>
          <Button
            loading={isPending}
            onClick={form.handleSubmit(handleCredentialLogin)}
            type="submit"
            className="mt-5 w-full"
            disabled={isPending}
          >
            Login
          </Button>
        </form>
      </FormProvider>
    </CardContent>
  );
};

export default LoginContainer;
