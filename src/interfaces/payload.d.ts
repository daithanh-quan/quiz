declare namespace Payload {
  export type LoginWithCredential = {
    email: string;
    password: string;
  };

  export type UpdateProfile = {
    username?: string;
    password?: string;
    status?: string;
  };

  export type CreateUser = {
    username: string;
    email: string;
    role: "admin" | "superAdmin" | "client";
    status: "active" | "pending";
  };

  export type CreateClasses = {
    name: string;
    description?: string;
  };

  export type EditClasses = CreateClasses;

  export type AddStudentToClass = {
    user_ids: number[];
  };

  export type RemoveStudentFromClass = AddStudentToClass;

  export type CreateExam = {
    name: string;
    description?: string;
  };

  export type EditExam = CreateExam;
}
