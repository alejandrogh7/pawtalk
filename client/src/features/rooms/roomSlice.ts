import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CreateRoom, Room, Rooms } from "./room.interface";
import { fetchRooms, fetchRoom, fetchCreateRoom } from "./roomAPI";

export interface RoomState {
  rooms: Rooms[] | null;
  room: Room | null;
  createdRoom: boolean;
}

const initialState: RoomState = {
  rooms: null,
  room: null,
  createdRoom: false,
};

export const getAllRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await fetchRooms();
  return response;
});

export const getAllRoom = createAsyncThunk(
  "rooms/fetchRoom",
  async (id: string) => {
    const response = await fetchRoom(id);
    return response;
  }
);

export const createRoom = createAsyncThunk(
  "rooms/fetchCreateRoom",
  async (payload: CreateRoom) => {
    const response = await fetchCreateRoom(payload);
    return response;
  }
);

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearRooms: (state) => {
      state.rooms = null;
    },
    clearRoom: (state) => {
      state.room = null;
    },
    clearCreatedRoom: (state) => {
      state.createdRoom = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRooms.pending, (state) => {
        state.rooms = null;
      })
      .addCase(getAllRooms.rejected, (state) => {
        state.rooms = null;
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(getAllRoom.pending, (state) => {
        state.room = null;
      })
      .addCase(getAllRoom.rejected, (state) => {
        state.room = null;
      })
      .addCase(getAllRoom.fulfilled, (state, action) => {
        state.room = action.payload;
      })
      .addCase(createRoom.pending, (state) => {
        state.createdRoom = false;
      })
      .addCase(createRoom.rejected, (state) => {
        state.createdRoom = false;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.createdRoom = true;
        state.room = action.payload;
      });
  },
});

export const { clearRoom, clearRooms, clearCreatedRoom } = roomSlice.actions;

export const selectRooms = (state: RootState) => state.rooms.rooms;

export const selectRoom = (state: RootState) => state.rooms.room;

export const selectCreatedRoom = (state: RootState) => state.rooms.createdRoom;

export default roomSlice.reducer;
