import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import userApi from "src/api/users";

export const useUpdateProfile = (
  id: number,
  options?: UseMutationOptions<any, unknown, Payload.UpdateProfile>,
) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await userApi.updateProfile(data, id);

      return response;
    },
    ...options,
  });
};
