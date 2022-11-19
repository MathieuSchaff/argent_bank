import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const loginUser = createAsyncThunk(
  // action type string
  "userAuth/login",
  // callback function
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      if (rememberMe) {
        localStorage.setItem("token", data.body.token);
      } else {
        sessionStorage.setItem("token", data.body.token);
      }

      return data.body.token;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  status: "idle",
  token: null,
  error: null,
};
console.log(initialState);
const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logOut: (state) => {
      state = {
        status: "idle",
        token: null,
        error: null,
      };
    },
  },
  extraReducers: {
    // register user
    [loginUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.error = null;
      console.log(payload);
      state.token = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.status = "idle";
      state.error = payload;
    },
  },
});
export default userAuthSlice;
