import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CreateRoom, Room, Rooms } from "./room.interface";
import { fetchRooms, fetchRoom, fetchCreateRoom } from "./roomAPI";

export interface RoomState {
  rooms: Rooms[] | null;
  roomsStatus: number;
  room: Room | null;
  roomStatus: number;
  createdRoom: boolean;
  createdRoomStatus: number;
}

const initialState: RoomState = {
  rooms: null,
  roomsStatus: 0,
  room: null,
  roomStatus: 0,
  createdRoom: false,
  createdRoomStatus: 0,
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
      state.roomsStatus = 0;
    },
    clearRoom: (state) => {
      state.room = null;
      state.roomStatus = 0;
    },
    clearCreatedRoom: (state) => {
      state.createdRoom = false;
      state.createdRoomStatus = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRooms.pending, (state) => {
        state.rooms = null;
        state.roomsStatus = 0;
      })
      .addCase(getAllRooms.rejected, (state) => {
        state.rooms = null;
        state.roomsStatus = 404;
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.rooms = action.payload.data;
        state.roomsStatus = action.payload.status;
      })
      .addCase(getAllRoom.pending, (state) => {
        state.room = null;
        state.roomStatus = 0;
      })
      .addCase(getAllRoom.rejected, (state) => {
        state.room = null;
        state.roomStatus = 404;
      })
      .addCase(getAllRoom.fulfilled, (state, action) => {
        state.room = action.payload.data;
        state.roomStatus = action.payload.status;
      })
      .addCase(createRoom.pending, (state) => {
        state.createdRoom = false;
        state.createdRoomStatus = 0;
      })
      .addCase(createRoom.rejected, (state) => {
        state.createdRoom = false;
        state.createdRoomStatus = 404;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.createdRoom = true;
        state.room = action.payload.data;
        state.createdRoomStatus = action.payload.status;
      });
  },
});

export const { clearRoom, clearRooms, clearCreatedRoom } = roomSlice.actions;

export const selectRooms = (state: RootState) => state.rooms.rooms;

export const selectRoomsStatus = (state: RootState) => state.rooms.roomsStatus;

export const selectRoom = (state: RootState) => state.rooms.room;

export const selectRoomStatus = (state: RootState) => state.rooms.roomStatus;

export const selectCreatedRoom = (state: RootState) => state.rooms.createdRoom;

export const selectCreatedRoomStatus = (state: RootState) =>
  state.rooms.createdRoomStatus;

export default roomSlice.reducer;
