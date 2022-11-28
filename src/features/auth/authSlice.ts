import { RootState } from "./../../app/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface InitialStateAuthSlice {
  user: string | null;
  token: string | null;
}
const initialState: InitialStateAuthSlice = { user: null, token: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      console.log(action);
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;

export const selectCurentTokenAuth = (state: RootState) => state.auth.token;
export const selectCurentUserAuth = (state: RootState) => state.auth.user;
