declare namespace Response {
  export type ErrorResponse = {
    status: number;
    message: string;
  };

  export type Pagination = {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };

  export type Me = {
    id: number;
    username: string;
    email: string;
    role: string;
    status: "pending" | "active";
  };

  export type SignIn = {
    access_token: string;
    refreshToken?: string;
  };

  export type UpdateProfile = Partial<Me>;

  export type Classes = {
    id: number;
    name: string;
    description: string | null;
    created_by: number;
    created_at: string;
    updated_at: string;
  };

  export type Student = {
    id: number;
    username: string;
    status: string;
    email: string;
    created_at: string;
  };

  export type Exam = {
    id: number;
    name: string;
    description: string | null;
    creator: number;
    questions: Question[];
    created_at: string;
    updated_at: string;
  };

  export type Answer = {
    id: number;
    is_correct: boolean;
    answer_text: string;
    question_id: number;
  };

  export type Question = {
    id: number;
    content: string;
    options: string[];
    answers: Answer[];
    exam_id: number;
    exam: Exam;
    question_type: "checkbox" | "radio";
    question_text: string | null;
    created_at: string;
    updated_at: string | null;
    admin: {
      id: number;
      username: string;
      email: string;
    };
  };
}
