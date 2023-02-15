import axios from "axios";
import { Room, Rooms } from "./room.interface";

export const fetchRooms = async (): Promise<Rooms[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const fetchRoom = async (roomID: string): Promise<Room> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/rooms/${roomID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
