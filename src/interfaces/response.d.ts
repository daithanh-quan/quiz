declare namespace Response {
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
}
