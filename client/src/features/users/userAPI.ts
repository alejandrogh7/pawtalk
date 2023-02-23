import { AxiosResponse } from "axios";
import axiosConf from "../../app/axiosConfig";
import { SigninPayload, SignupPayload } from "./user.interface";

export const fetchLogin = async (
  payload: SigninPayload
): Promise<AxiosResponse> => {
  const response = await axiosConf.post(`/auth/signin`, payload);
  return response;
};

export const fetchRegister = async (
  payload: SignupPayload
): Promise<AxiosResponse> => {
  const response = await axiosConf.post(`/auth/signup`, payload);
  return response;
};

export const fetchLogout = async (): Promise<AxiosResponse> => {
  const response = await axiosConf.post(`/auth/logout`);
  return response;
};
