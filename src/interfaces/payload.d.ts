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

  export type CreateClasses = {
    name: string;
    description?: string;
  };

  export type EditClasses = CreateClasses;

  export type AddStudentToClasses = {
    user_id: number;
  };
}
