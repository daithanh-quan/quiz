import React from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { keys } from "src/lib/cookie";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get(keys.token);

  if (token) {
    redirect("/");
  }

  return <div className="auth-page">{children}</div>;
}
