import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authHeader from "./authHeader";
import type { RootState } from "../../app/store";
import type { AxiosError } from "axios";
interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

export const fetchUser = createAsyncThunk<
  any,
  any,
  { getState: RootState; rejectValue: ValidationErrors }
>(
  // action type string
  "user/retrieveData",
  // callback function
  async (_, { getState, rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const state = getState();
      const authHeaders = authHeader(state.userAuth.token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
      };
      console.log(...authHeader);
      console.log(config);
      const { data } = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        config
      );
      return data.body.user;
    } catch (error) {
      let error: AxiosError<ValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error.response.data);
    }
  }
);
const fetchDataUserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
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
