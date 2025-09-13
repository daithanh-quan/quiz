declare namespace Response {
  export type Me = {
    id: number;
    name: string;
    email: string;
    role: string;
  };

  export type SignIn = {
    access_token: string;
    refreshToken?: string;
  };
}
