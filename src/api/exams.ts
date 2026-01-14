import ApiService from "./baseAxios/apiService";

export const keys = {
  getList: (params: Param.GetListClass) => ["/exams/", params] as const,
  create: () => [`/exams/`] as const,
  update: () => [`/exams`] as const,
  delete: () => [`/exams`] as const,
};

export type ExamListResponse = {
  data: Response.Exam[];
  pagination: Response.Pagination;
};

class Exams extends ApiService {
  getList = async (params?: Param.GetListExam) => {
    return await this.get<ExamListResponse>(keys.getList(params)[0], params);
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

const examsApi = new Exams();

export default examsApi;
