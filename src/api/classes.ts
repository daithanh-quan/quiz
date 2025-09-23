import ApiService from "./baseAxios/apiService";

export const keys = {
  getList: (params: Param.GetListClass) => ["/classes/", params] as const,
  create: () => [`/classes/`] as const,
  update: () => [`/classes`] as const,
  delete: () => [`/classes`] as const,
};

export type ClassesListResponse = {
  data: Response.Classes[];
  pagination: Response.Pagination;
};

class Classes extends ApiService {
  getList = async (params?: Param.GetListClass) => {
    return await this.get<ClassesListResponse>(keys.getList(params)[0], params);
  };

  create = async (data: Payload.CreateClasses) => {
    return await this.post<Payload.CreateClasses, Response.Classes>(
      keys.create()[0],
      data,
    );
  };

  update = async (id: number, data: Payload.EditClasses) => {
    return await this.put<Payload.EditClasses, Response.Classes>(
      keys.update()[0],
      id,
      data,
    );
  };
  deleteClass = async (id: number) => {
    return await this.delete(keys.delete()[0], id);
  };
}

const classesApi = new Classes();

export default classesApi;
