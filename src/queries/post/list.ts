// import { useSuspenseQuery } from "@tanstack/react-query";
//
// import { ReactQueryOptions } from "src/interfaces/global";
//
// export const useGetPosts = <T>(options?: ReactQueryOptions<T>) => {
//   // const { setPosts } = usePostStore();
//   //you can query on client
//   //you can set data on client
//   // return useQuery({
//   //   queryKey: keys.posts(),
//   //   queryFn: async () => {
//   //     const data = await postApi.getList();
//   //     setPosts(data);
//   //     return data;
//   //   },
//   //   ...options,
//   // });
//   //-----------------------------------
//   //you can query on server
//   return useSuspenseQuery({
//     queryKey: keys.posts(),
//     queryFn: async () => {
//       const data = await postApi.getList();
//       return data;
//     },
//     ...options,
//   });
// };
