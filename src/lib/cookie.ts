import { deleteCookie, getCookie, setCookie } from "cookies-next/client";

export const keys = {
  token: "token",
  refreshToken: "refreshToken",
  role: "role",
};

class Cookie {
  setToken(token: string) {
    setCookie(keys.token, token);
  }

  setRole(role: string) {
    setCookie(keys.role, role);
  }

  getToken() {
    return getCookie(keys.token);
  }

  getRole() {
    return getCookie(keys.role);
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

  deleteRole() {
    deleteCookie(keys.role);
  }

  logout() {
    this.deleteToken();
    this.deleteRole();
  }

  deleteRefreshToken() {
    deleteCookie(keys.refreshToken);
  }
}

const cookie = new Cookie();

export default cookie;
