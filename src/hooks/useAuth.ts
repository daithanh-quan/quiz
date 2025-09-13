import { redirect } from "next/navigation";

import cookie from "src/lib/cookie";

const useAuth = () => {
  const logout = () => {
    cookie.logout();
    redirect("/login");
  };

  return { logout };
};

export default useAuth;
