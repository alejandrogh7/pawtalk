import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { SigninPayload, SigninResponse, SignupPayload } from "./user.interface";
import { fetchLogin, fetchRegister } from "./userAPI";

export interface RoomState {
  signup: boolean;
  signin: SigninResponse | null;
}

const initialState: RoomState = {
  signup: false,
  signin: null,
};

export const fetchSignUp = createAsyncThunk(
  "users/fetchSignUp",
  async (payload: SignupPayload) => {
    const response = await fetchRegister(payload);
    return response;
  }
);

export const fetchSignIn = createAsyncThunk(
  "users/fetchSignIn",
  async (payload: SigninPayload) => {
    const response = await fetchLogin(payload);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearSignup: (state) => {
      state.signup = false;
    },
    clearSignin: (state) => {
      state.signin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.signup = false;
      })
      .addCase(fetchSignUp.rejected, (state) => {
        state.signup = false;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.signup = action.payload;
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.signin = null;
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.signin = null;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.signin = action.payload;
      });
  },
});

export const { clearSignup, clearSignin } = userSlice.actions;

export const selectSignUp = (state: RootState) => state.users.signup;

export const selectSignIn = (state: RootState) => state.users.signin;

export default userSlice.reducer;
