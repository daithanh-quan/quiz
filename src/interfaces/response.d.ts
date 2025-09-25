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

  export type GetListStudent = {
    id: number;
    username: string;
    role: string;
    status: string;
    created_by_admin: boolean;
    email: string;
    created_at: string;
  };
}
