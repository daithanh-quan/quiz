import { deleteCookie, getCookie, setCookie } from "cookies-next/client";

export const keys = {
  token: "token",
  refreshToken: "refreshToken",
};

class Cookie {
  setToken(token: string) {
    setCookie(keys.token, token);
  }

  getToken() {
    return getCookie(keys.token);
  }

  getRefreshToken() {
    return getCookie(keys.refreshToken);
  }

  setRefreshToken(refreshToken: string) {
    return setCookie(keys.refreshToken, refreshToken);
  }

  deleteToken() {
    deleteCookie(keys.token);
  }

  deleteRefreshToken() {
    deleteCookie(keys.refreshToken);
  }
}

const cookie = new Cookie();

export default cookie;
