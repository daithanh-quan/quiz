import { useQuery } from "@tanstack/react-query";

import userApi, { keys } from "src/api/users";
import { ReactQueryOptions } from "src/interfaces/global";

export const useGetListStudent = <T>(
  params?: Param.GetListStudent,
  options?: ReactQueryOptions<T>,
) => {
  return useQuery({
    queryKey: keys.getList(params),
    queryFn: async () => {
      const data = await userApi.getList(params);

      return data;
    },
    ...options,
  });
};
