import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import roomReducer from "../features/rooms/roomSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    users: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
