import { useQuery } from "@tanstack/react-query";

import authApi, { keys } from "src/api/auth";
import { ReactQueryOptions } from "src/interfaces/global";

export const useGetMe = <T>(options?: ReactQueryOptions<T>) => {
  return useQuery({
    queryKey: keys.me(),
    queryFn: async () => {
      const data = await authApi.getMe();

      return data as Response.Me;
    },
    ...options,
  });
};
