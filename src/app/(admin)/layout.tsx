import React from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminLayout } from "src/components/layout";
import { keys } from "src/lib/cookie";
import { routerRole } from "src/utils";

type Props = {
  children: React.ReactNode;
};
const Layout: React.FC<Props> = async ({ children }) => {
  const cookieStore = await cookies();
  const role = cookieStore.get(keys.role) as { value: string };

  if (!role) redirect("/login");

  if (role?.value !== "admin") redirect(routerRole[role.value]);

  return <AdminLayout>{children}</AdminLayout>;
};

export default Layout;
