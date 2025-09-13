import type React from "react";

import Image from "next/image";

import logo from "src/assets/images/quiz_logo.png";
import { Card, CardHeader, CardTitle } from "src/components/ui/card";
import LoginContainer from "src/containers/auth/login";
import AnimatedBackground from "src/containers/auth/login/background";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatedBackground />
      </div>

      <Card className="z-10 w-full max-w-md">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center justify-center p-0">
            <Image src={logo} alt="Logo" width={200} height={200} />
          </CardTitle>
        </CardHeader>
        <LoginContainer />
      </Card>
    </div>
  );
}
