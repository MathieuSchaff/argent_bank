import { RootState } from "./../../app/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DataToken } from "../../components/Login/loginApiSlice";
import type { IResponseToken } from "../../app/api/apiSlice";
import { UserData } from "../../components/UserRouter/userApiSlice";

interface InitialStateAuthSlice {
  user: UserData | null;
  token: string | null;
}

const initialState: InitialStateAuthSlice = { user: null, token: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IResponseToken<UserData>>) => {
      const user = action.payload.body;
      state.user = user;
    },
    changeUserLastFirstName: (
      state,
      action: PayloadAction<IResponseToken<UserData>>
    ) => {
      const { firstName, lastName } = action.payload.body;
      if (state.user) {
        state.user.lastName = lastName;
        state.user.firstName = firstName;
      }
    },
    setToken: (state, action: PayloadAction<IResponseToken<DataToken>>) => {
      const { token } = action.payload.body;
      state.token = token;
    },
    logout: (state) => {
      if (localStorage.getItem("token") !== null) {
        localStorage.removeItem("token");
      }
      state.user = null;
      state.token = null;
    },
  },
});

export const { logout, setUser, setToken, changeUserLastFirstName } =
  authSlice.actions;
export default authSlice.reducer;

export const selectCurentTokenAuth = (state: RootState) => state.auth.token;
export const selectCurentUserAuth = (state: RootState) => state.auth.user;
