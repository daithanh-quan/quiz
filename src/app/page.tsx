"use client";

import React from "react";

import { redirect } from "next/navigation";

import Spin from "src/components/loadings/spin";
import { Button } from "src/components/ui/button";
import { useGetMe } from "src/queries/auth/me";
import { routerRole } from "src/utils";

export default function Home() {
  const {
    data: me,
    isLoading,
    isError,
  } = useGetMe<Response.Me>({
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (!me) {
    redirect("/login");
  }

  if (me) {
    redirect(routerRole[me.role]);
  }

  if (isError) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p>Something went wrong</p>
        <Button onClick={() => redirect("/")}>Back to home</Button>
      </div>
    );
  }
}
