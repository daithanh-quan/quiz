import { useQuery } from "@tanstack/react-query";

import classesApi, { keys } from "src/api/classes";
import { ReactQueryOptions } from "src/interfaces/global";

export const useGetListClass = <T>(
  params?: Param.GetListClass,
  options?: ReactQueryOptions<T>,
) => {
  return useQuery({
    queryKey: keys.getList(params),
    queryFn: async () => {
      const data = await classesApi.getList(params);

      return data;
    },
    ...options,
  });
};
