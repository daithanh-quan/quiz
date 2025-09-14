declare namespace Response {
  export type Me = {
    id: number;
    username: string;
    email: string;
    role: string;
  };

  export type SignIn = {
    access_token: string;
    refreshToken?: string;
  };

  export type UpdateProfile = Partial<Me>;
}
