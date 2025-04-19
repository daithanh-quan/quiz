declare namespace Response {
  export type Post = {
    id: number;
    title: string;
    body: string;
  };

  export type Me = {
    id: number;
    name: string;
    email: string;
  };

  export type SignIn = {
    accessToken: string;
    refreshToken: string;
    user: Me;
  };

  export type PostList = Post[];
}
