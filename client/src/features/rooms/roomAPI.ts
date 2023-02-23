import { AxiosResponse } from "axios";
import axiosConf from "../../app/axiosConfig";
import { CreateRoom } from "./room.interface";

export const fetchRooms = async (): Promise<AxiosResponse> => {
  const response = await axiosConf.get(`/rooms`);
  return response;
};

export const fetchRoom = async (roomID: string): Promise<AxiosResponse> => {
  const response = await axiosConf.get(`/rooms/${roomID}`);
  return response;
};

export const fetchCreateRoom = async (
  payload: CreateRoom
): Promise<AxiosResponse> => {
  const response = await axiosConf.post(`/rooms/`, payload);
  return response;
};
