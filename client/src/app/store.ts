import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import roomReducer from "../features/rooms/roomSlice";

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
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
