import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

import examApi, { keys as detailKey } from "src/api/exam";
import examsApi from "src/api/exams";
import { ReactQueryOptions } from "src/interfaces/global";

export const useGetDetailExam = <T>(
  id: number,
  options?: ReactQueryOptions<T>,
) => {
  return useQuery({
    queryKey: detailKey.getDetail(id),
    queryFn: async () => {
      const data = await examApi.getDetail(id);

      return data;
    },
    ...options,
  });
};

export const useGetListQuestionInExam = <T>(
  examId: number,
  options?: ReactQueryOptions<T>,
) => {
  return useQuery({
    queryKey: detailKey.getListQuestionInExam(examId),
    queryFn: async () => {
      const data = await examApi.getListQuestionInExam(examId);

      return data;
    },
    ...options,
  });
};

export const useCreateExam = (
  options?: UseMutationOptions<any, unknown, Payload.CreateExam>,
) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await examsApi.create(data);

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
      const response = await examsApi.update(id, data);

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
      const response = await examsApi.deleteExam(id);

      return response;
    },
    ...options,
  });
};

export const useAddQuestionsInExam = (
  options?: UseMutationOptions<
    any,
    unknown,
    { id: number; data: Payload.AddQuestionsToExam }
  >,
) => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await examApi.addQuestionsInExam(id, data);

      return response;
    },
    ...options,
  });
};

export const useRemoveQuestionsInExam = (
  options?: UseMutationOptions<
    any,
    unknown,
    { id: number; data: Payload.RemoveQuestionsToExam }
  >,
) => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await examApi.removeQuestionsInExam(id, data);

      return response;
    },
    ...options,
  });
};
