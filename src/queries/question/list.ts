import { useQuery } from "@tanstack/react-query";

import questionApi, { keys } from "src/api/questions";
import { ReactQueryOptions } from "src/interfaces/global";

export const useGetListQuestion = <T>(
  params?: Param.GetListQuestion,
  options?: ReactQueryOptions<T>,
) => {
  return useQuery({
    queryKey: keys.getList(params),
    queryFn: async () => {
      const data = await questionApi.getList(params);

      return data;
    },
    ...options,
  });
};
