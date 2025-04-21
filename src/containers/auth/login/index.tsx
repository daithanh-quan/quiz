"use client";

import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z, ZodType } from "zod";

import { InputField } from "src/components/forms";
import InputPwField from "src/components/forms/passwordField";
import { GoogleIcon } from "src/components/svgs";
import { Button } from "src/components/ui/button";
import { CardContent } from "src/components/ui/card";
import { useSignIn } from "src/queries/auth/login";

type LoginFormValues = {
  email: string;
  password: string;
};

const schema: ZodType<Partial<LoginFormValues>> = z.object({
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

const LoginContainer = () => {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { mutate, isPending } = useSignIn({
    onSuccess: (data) => {
      router.push("/");
    },
    onError: (error) => {
      toast.error("Login failed");
    },
  });

  const handleCredentialLogin: SubmitHandler<LoginFormValues> = async (v) => {
    const { email, password } = v;
    const payload = { email, password };
    mutate(payload);
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { redirect: false });
  };

  return (
    <CardContent className="space-y-4">
      <FormProvider {...form}>
        <div className="space-y-2">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password">Password</label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>
          <InputPwField name="password" />
        </div>
        <Button
          onClick={form.handleSubmit(handleCredentialLogin)}
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login with Email"}
        </Button>
      </FormProvider>

      <div className="flex items-center justify-center">
        <span className="px-3 text-sm text-gray-500">OR</span>
      </div>

      <Button
        type="button"
        variant="outline"
        className="flex w-full items-center justify-center gap-2"
        onClick={handleGoogleLogin}
        disabled={isPending}
      >
        <GoogleIcon />
        Continue with Google
      </Button>
    </CardContent>
  );
};

export default LoginContainer;
