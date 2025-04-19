import type React from "react";

import Image from "next/image";
import Link from "next/link";

import bg from "src/assets/images/background-login.jpg";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import LoginContainer from "src/containers/auth/login";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bg}
          alt="AI Interview Background"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
      </div>
      <Card className="z-10 w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <LoginContainer />
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            {"Don't"} have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
