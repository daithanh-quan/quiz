import ApiService from "./baseAxios/apiService";

export const keys = {
  updateProfile: (id: number) => [`/users`, id] as const,
};

class User extends ApiService {
  updateProfile = async (data: Payload.UpdateProfile, id: number) => {
    return await this.put<Payload.UpdateProfile, Response.UpdateProfile>(
      keys.updateProfile(id)[0],
      keys.updateProfile(id)[1],
      data,
    );
  };
}

const userApi = new User();

export default userApi;
