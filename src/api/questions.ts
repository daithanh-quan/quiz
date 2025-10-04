import ApiService from "./baseAxios/apiService";

export const keys = {
  getList: (params: Param.GetListQuestion) =>
    ["/api/questions/admin/all", params] as const,
  create: () => [`/api/questions/admin/`] as const,
  update: () => [`/api/questions/admin`] as const,
  delete: () => [`/api/questions/admin`] as const,
};

export type QuestionListResponse = {
  data: {
    questions: Response.Question[];
    pagination: Response.Pagination;
  };
};

class Questions extends ApiService {
  getList = async (params?: Param.GetListExam) => {
    return await this.get<QuestionListResponse>(
      keys.getList(params)[0],
      params,
    );
  };

  create = async (data: Payload.CreateExam) => {
    return await this.post<Payload.CreateExam, Response.Exam>(
      keys.create()[0],
      data,
    );
  };

  update = async (id: number, data: Payload.EditExam) => {
    return await this.put<Payload.EditExam, Response.Exam>(
      keys.update()[0],
      id,
      data,
    );
  };
  deleteExam = async (id: number) => {
    return await this.delete(keys.delete()[0], id);
  };
}

const questionApi = new Questions();

export default questionApi;
