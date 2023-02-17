import axios from "axios";
import { SigninPayload, SigninResponse, SignupPayload } from "./user.interface";

export const fetchLogin = async (
  payload: SigninPayload
): Promise<SigninResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/signin`,
    payload
  );
  return response.data;
};

export const fetchRegister = async (
  payload: SignupPayload
): Promise<boolean> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/signup`,
    payload
  );
  return response.data;
};
