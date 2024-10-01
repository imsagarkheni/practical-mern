import { LOGIN, LOGOUT, REGISTER } from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const logIn = (payload) => {
  return apiInstance.post(LOGIN, payload);
};

export const register = (payload) => {
  return apiInstance.post(REGISTER, payload);
};

export const logOut = () => {
  return apiInstance.post(LOGOUT, {}, { headers: authHeader() });
};
