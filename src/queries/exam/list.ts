import { useQuery } from "@tanstack/react-query";

import examApi, { keys } from "src/api/exams";
import { ReactQueryOptions } from "src/interfaces/global";

export const useGetListExam = <T>(
  params?: Param.GetListExam,
  options?: ReactQueryOptions<T>,
) => {
  return useQuery({
    queryKey: keys.getList(params),
    queryFn: async () => {
      const data = await examApi.getList(params);

      return data;
    },
    ...options,
  });
};
