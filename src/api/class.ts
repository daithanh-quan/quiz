import ApiService from "./baseAxios/apiService";

export const keys = {
  getClass: (id: number) => [`/classes/${id}`] as const,
  getUsersInClass: (id: number) => [`/classes/${id}/users`] as const,
  addStudentInClass: (id: number) => [`/classes/${id}/users/bulk`] as const,
  removeStudentInClass: (id: number) =>
    [`/classes/${id}/users/bulk-remove`] as const,
};

export type UsersInClassResponse = {
  users: Response.Student[];
};

class Class extends ApiService {
  getClass = async (id: number) => {
    return await this.get<Response.Classes>(keys.getClass(id)[0]);
  };
  getUsersInClass = async (id: number) => {
    return await this.get<UsersInClassResponse>(keys.getUsersInClass(id)[0]);
  };

  addStudentInClass = async (id: number, data: Payload.AddStudentToClass) => {
    return await this.post<Payload.AddStudentToClass, Response.Classes>(
      keys.addStudentInClass(id)[0],
      data,
    );
  };

  removeStudentInClass = async (
    id: number,
    data: Payload.RemoveStudentFromClass,
  ) => {
    return await this.put(keys.removeStudentInClass(id)[0], null, data);
  };
}

const classApi = new Class();

export default classApi;
