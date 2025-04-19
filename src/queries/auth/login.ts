import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import authApi from "src/api/auth";

export const useSignIn = (
  options: UseMutationOptions<any, unknown, Payload.LoginWithCredential>,
) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await authApi.signIn(data);
      return response;
    },
    ...options,
  });
};
