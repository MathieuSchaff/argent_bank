import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import authHeader from "./authHeader";
import type { RootState, Store } from "../../app/store";
import type { TypedAuthorization } from "./authHeader";
import { Root } from "react-dom/client";

export interface User {
  status: string;
  user: null | Object;
  error: string | null;
}
interface IUser {
  status: number;
  message: "string";
  body: {
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
}

export const fetchUser = createAsyncThunk(
  // action type string
  "user/fetchUserData",
  // callback function
  async (_, thunkApi) => {
    try {
      // configure header's Content-Type as JSON

      const state = thunkApi.getState();
      // const authHeaders = state?.userAuth?.token
      //   ? authHeader(state?.userAuth?.token)
      //   : null;
      const authHeaders = {};
      if (!authHeader) {
        throw new Error("Token invalide ou absent");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
      };
      console.log(config);
      const { data } = await axios.post<IUser>(
        "http://localhost:3001/api/v1/user/profile",
        config
      );
      return { ...data.body };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return thunkApi.rejectWithValue(error.message);
      } else {
        console.log("unexpected error: ", error);
        return thunkApi.rejectWithValue("An unexpected error occurred");
      }
    }
  }
);
const initialState: User = {
  user: null,
  status: "idle",
  error: null,
};
const fetchDataUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // builder.addCase(fetchUser.pending), (state) => {

    // },
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.error = null;
      console.log(payload);
      state.user = payload;
    });
    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload as string;
    });
  },
});

export default fetchDataUserSlice;
