import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import examApi from "src/api/exams";

export const useCreateExam = (
  options?: UseMutationOptions<any, unknown, Payload.CreateExam>,
) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await examApi.create(data);

      return response;
    },
    ...options,
  });
};

export const useEditExam = (
  id: number,
  options?: UseMutationOptions<any, unknown, Payload.EditExam>,
) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await examApi.update(id, data);

      return response;
    },
    ...options,
  });
};

export const useDeleteExam = (
  options?: UseMutationOptions<any, unknown, number>,
) => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await examApi.deleteExam(id);

      return response;
    },
    ...options,
  });
};
