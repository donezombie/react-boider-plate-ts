import { AxiosRequestConfig, AxiosResponse } from "axios";
import httpService from "./httpService";
import { PromiseResponseBase } from "@/interfaces/common";
import { Profile } from "@/interfaces/user";

export interface RequestLogin {
  username: string;
  password: string;
}
export interface Data {
  token?: string;
  profile?: Profile;
}

export type ResponseLogin = AxiosResponse<{
  token?: string;
  profile?: Profile;
}>;

export interface RequestVerifyPassword {
  code: string;
  newPassword: string;
}

export interface RequestChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface RequestUpdateProfile {
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  coAppEmail?: string;
  url?: string;
}

export type ResponseGetUserInfo = AxiosResponse<{ data: Profile }>;

class AuthService {
  login(body: RequestLogin): PromiseResponseBase<ResponseLogin> {
    return httpService.post("/auth/login", body);
  }

  changePassword(body: { currentPassword: string; newPassword: string }) {
    return httpService.post("/auth/change-password", body);
  }

  resetPassword(username: string) {
    return httpService.post("/auth/reset-password", { username });
  }

  verifyResetPassword(body: RequestVerifyPassword) {
    return httpService.post("/auth/reset-password/verify", body);
  }

  updateProfile(body: RequestUpdateProfile) {
    return httpService.post("/auth/update-profile", body);
  }

  getUserInfo(
    configs: AxiosRequestConfig
  ): PromiseResponseBase<ResponseGetUserInfo> {
    return httpService.get("/auth/me", configs);
  }
}

export default new AuthService();
