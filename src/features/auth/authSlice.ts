import { authApiSlice } from "./../../app/api/authApiSlice";
import { RootState } from "./../../app/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DataToken } from "../../app/api/authApiSlice";
import type { IResponseToken } from "../../app/api/apiSlice";
interface InitialStateAuthSlice {
  user: string | null;
  token: string | null;
}

const initialState: InitialStateAuthSlice = { user: null, token: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      console.log(action);
      const { user } = action.payload.body;
      state.user = user;
    },
    setToken: (state, action: PayloadAction<IResponseToken<DataToken>>) => {
      console.log(action);
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

export const { logout, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;

export const selectCurentTokenAuth = (state: RootState) => state.auth.token;
export const selectCurentUserAuth = (state: RootState) => state.auth.user;
