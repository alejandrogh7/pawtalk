import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../../app/store";
import { SigninPayload, SignupPayload, User } from "./user.interface";
import { fetchLogin, fetchRegister } from "./userAPI";

export interface RoomState {
  signup: boolean;
  signin: User | null;
}

const initialState: RoomState = {
  signup: false,
  signin: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : null,
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
      localStorage.removeItem("user");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
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
        const { user, tokens } = action.payload;

        Cookies.set("access_token", tokens.access_token);
        Cookies.set("refresh_token", tokens.refresh_token);

        localStorage.setItem("user", JSON.stringify(user));
        state.signin = user;
      });
  },
});

export const { clearSignup, clearSignin } = userSlice.actions;

export const selectSignUp = (state: RootState) => state.users.signup;

export const selectSignIn = (state: RootState) => state.users.signin;

export default userSlice.reducer;
