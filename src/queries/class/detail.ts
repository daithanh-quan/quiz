import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

import classApi, { keys, UsersInClassResponse } from "src/api/class";
import classesApi from "src/api/classes";
import { ReactQueryOptions } from "src/interfaces/global";

export const useGetClassDetail = <T>(
  id: number,
  options?: ReactQueryOptions<T>,
) => {
  return useQuery({
    queryKey: keys.getClass(id),
    queryFn: async () => {
      const data = await classApi.getClass(id);

      return data as Response.Classes;
    },
    ...options,
  });
};
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

export const useGetStudentInClass = <T>(
  class_id: number,
  options?: ReactQueryOptions<T>,
) => {
  return useQuery({
    queryKey: keys.getUsersInClass(class_id),
    queryFn: async () => {
      const data = await classApi.getUsersInClass(class_id);

      return data as UsersInClassResponse;
    },
    ...options,
  });
};
export const useAddStudentToClass = (
  id: number,
  options?: UseMutationOptions<any, unknown, Payload.AddStudentToClass>,
) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await classApi.addStudentInClass(id, data);

      return response;
    },
    ...options,
  });
};

export const useRemoveStudentFromClass = (
  id: number,
  options?: UseMutationOptions<any, unknown, Payload.RemoveStudentFromClass>,
) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await classApi.removeStudentInClass(id, data);

      return response;
    },
    ...options,
  });
};
