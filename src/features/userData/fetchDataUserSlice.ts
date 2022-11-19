import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import authHeader from "./authHeader";
import type { RootState } from "../../app/store";
import type { TypedAuthorization } from "./authHeader";

export interface User {
  status: "idle";
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
  "user/retrieveData",
  // callback function
  async (_, { getState, rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const state = getState();
      const authHeaders = state.userAuth.token
        ? authHeader(state.userAuth.token)
        : null;
      if (!authHeader) {
        return rejectWithValue("Token invalide ou absent");
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
        return rejectWithValue(error.message);
      } else {
        console.log("unexpected error: ", error);
        return rejectWithValue("An unexpected error occurred");
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
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.error = null;
      console.log(payload);
      state.user = payload;
    },
    [fetchUser.rejected]: (state, { payload }) => {
      state.status = "idle";
      state.error = payload;
    },
  },
});

export default fetchDataUserSlice;
