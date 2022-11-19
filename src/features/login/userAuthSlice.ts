import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { formData } from "./Login";
export interface UserAuth {
  status: string;
  token: string | null;
  error: string | null;
}
interface IToken {
  status: number;
  message: string;
  body: {
    token: "string";
  };
}
export const loginUser = createAsyncThunk(
  // action type string
  "userAuth/login",
  // callback function
  async ({ email, password, rememberMe }: formData, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post<IToken>(
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

const initialState: UserAuth = {
  status: "idle",
  token: null,
  error: null,
};
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
// .addCase(decrement, (state, action: PayloadAction<string>) => {
//   // this would error out
// })
