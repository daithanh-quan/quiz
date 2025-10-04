import { redirect } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";

import cookie from "src/lib/cookie";

const useAuth = () => {
  const queryClient = useQueryClient();
  const logout = () => {
    cookie.logout();
    queryClient.clear();
    redirect("/login");
  };

  return { logout };
};

export default useAuth;
