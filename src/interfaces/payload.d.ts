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
}
