import ApiService from "./baseAxios/apiService";

export const keys = {
  updateProfile: (id: number) => [`/users`, id] as const,
  getList: (params: Param.GetListStudent) => [`/users/`, params] as const,
  createUser: () => [`/users/`] as const,
};

export type UserListResponse = {
  data: Response.Me[];
  pagination: Response.Pagination;
};

class User extends ApiService {
  updateProfile = async (data: Payload.UpdateProfile, id: number) => {
    return await this.put<Payload.UpdateProfile, Response.UpdateProfile>(
      keys.updateProfile(id)[0],
      keys.updateProfile(id)[1],
      data,
    );
  };

  getList = async (params: Param.GetListStudent) => {
    return await this.get<UserListResponse>(keys.getList(params)[0], params);
  };

  createUser = async (data: Payload.CreateUser) => {
    return await this.post<Payload.CreateUser, Response.Me>(
      keys.createUser()[0],
      data,
    );
  };

  changeStatus = async (
    id: number,
    data: Pick<Payload.CreateUser, "status">,
  ) => {
    return await this.put(keys.updateProfile(id)[0], id, data);
  };

  deleteUser = async (id: number) => {
    return await this.delete(keys.updateProfile(id)[0], id);
  };
}

const userApi = new User();

export default userApi;
