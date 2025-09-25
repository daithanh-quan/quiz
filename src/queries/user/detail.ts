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

export const useCreateUser = (
  options?: UseMutationOptions<any, unknown, Payload.CreateUser>,
) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await userApi.createUser(data);

      return response;
    },
    ...options,
  });
};

export const useChangeStatus = (
  id: number,
  options?: UseMutationOptions<
    any,
    unknown,
    Pick<Payload.CreateUser, "status">
  >,
) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await userApi.changeStatus(id, data);

      return response;
    },
    ...options,
  });
};

export const useDeleteUser = (
  options?: UseMutationOptions<any, unknown, number>,
) => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await userApi.deleteUser(id);

      return response;
    },
    ...options,
  });
};
