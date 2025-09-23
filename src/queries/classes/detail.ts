import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import classesApi from "src/api/classes";

export const useCreateClass = (
  options?: UseMutationOptions<any, unknown, Payload.CreateClasses>,
) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await classesApi.create(data);

      return response;
    },
    ...options,
  });
};

export const useEditClass = (
  id: number,
  options?: UseMutationOptions<any, unknown, Payload.EditClasses>,
) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await classesApi.update(id, data);

      return response;
    },
    ...options,
  });
};

export const useDeleteClass = (
  options?: UseMutationOptions<any, unknown, number>,
) => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await classesApi.deleteClass(id);

      return response;
    },
    ...options,
  });
};
