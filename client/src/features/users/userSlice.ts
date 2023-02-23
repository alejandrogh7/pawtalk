import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../../app/store";
import { SigninPayload, SignupPayload, User } from "./user.interface";
import { fetchLogin, fetchRegister, fetchLogout } from "./userAPI";

export interface RoomState {
  signup: boolean;
  signupStatus: number;
  signin: User | null;
  signinStatus: number;
}

const initialState: RoomState = {
  signup: false,
  signupStatus: 0,
  signin: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : null,
  signinStatus: 0,
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

export const fetchSignOut = createAsyncThunk("users/fetchLogout", async () => {
  const response = await fetchLogout();
  return response;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearSignup: (state) => {
      state.signup = false;
      state.signupStatus = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.signup = false;
        state.signupStatus = 0;
      })
      .addCase(fetchSignUp.rejected, (state) => {
        state.signup = false;
        state.signupStatus = 404;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.signup = action.payload.data;
        state.signupStatus = action.payload.status;
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.signin = null;
        state.signinStatus = 0;
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.signin = null;
        state.signinStatus = 404;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        const { user, tokens } = action.payload.data;

        Cookies.set("access_token", tokens.access_token);
        Cookies.set("refresh_token", tokens.refresh_token);

        localStorage.setItem("user", JSON.stringify(user));
        state.signin = user;
        state.signinStatus = action.payload.status;
      })
      .addCase(fetchSignOut.fulfilled, (state, action) => {
        localStorage.removeItem("user");
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        state.signin = null;
        state.signinStatus = 0;
      });
  },
});

export const { clearSignup } = userSlice.actions;

export const selectSignUp = (state: RootState) => state.users.signup;

export const selectSignUpStatus = (state: RootState) =>
  state.users.signupStatus;

export const selectSignIn = (state: RootState) => state.users.signin;

export const selectSignInStatus = (state: RootState) =>
  state.users.signinStatus;

export default userSlice.reducer;
