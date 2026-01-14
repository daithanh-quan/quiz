import ApiService from "./baseAxios/apiService";

export const keys = {
  getDetail: (id: number) => [`/exams/${id}`] as const,
  getListQuestionInExam: (examId: number) =>
    [`/exams/${examId}/questions/`] as const,
  addQuestionInExam: (examId: number) =>
    [`/questions/${examId}/add-questions`] as const,
  deleteQuestionsInExam: (examId: number) =>
    [`/questions/${examId}/remove-questions`] as const,
};

export type ListQuestionInExamResponse = {
  data: Response.Question[];
  pagination: Response.Pagination;
};

class Exam extends ApiService {
  getDetail = async (id: number) => {
    return await this.get<Response.Classes>(keys.getDetail(id)[0], {
      include_questions: true,
    });
  };

  getListQuestionInExam = async (examId: number) => {
    return await this.get<ListQuestionInExamResponse>(
      keys.getListQuestionInExam(examId)[0],
    );
  };

  addQuestionsInExam = async (
    examId: number,
    data: Payload.AddQuestionsToExam,
  ) => {
    return await this.post(keys.addQuestionInExam(examId)[0], data);
  };

  removeQuestionsInExam = async (
    examId: number,
    data: Payload.RemoveQuestionsToExam,
  ) => {
    return await this.delete(
      "",
      examId,
      {},
      data,
      keys.deleteQuestionsInExam(examId)[0],
    );
  };
}

const examApi = new Exam();

export default examApi;
