import ApiService from "./baseAxios/apiService";

export const keys = {
  signIn: () => ["/auth/login"] as const,
  me: () => ["/auth/me"] as const,
};

class Auth extends ApiService {
  signIn = async (data: Payload.LoginWithCredential) => {
    return await this.post<Payload.LoginWithCredential, Response.SignIn>(
      keys.signIn()[0],
      data,
    );
  };

  getMe = async () => {
    return await this.get<Response.Me>(keys.me()[0]);
  };
}

const authApi = new Auth();

export default authApi;
