import { apiSlice } from "../../app/api/apiSlice";
import type { IResponseToken } from "../../app/api/apiSlice";
import { UserData } from "../UserRouter/userApiSlice";
export interface IUserFirstLastData {
  firstName: string;
  lastName: string;
}

export interface IRespMutation {
  id: string;
  email: string;
}
export const formEditSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeUserData: builder.mutation<
      IResponseToken<UserData>,
      IUserFirstLastData
    >({
      query: (changes: IUserFirstLastData) => ({
        url: "/profile",
        method: "PUT",
        body: changes,
      }),
    }),
  }),
});

export const { useChangeUserDataMutation } = formEditSlice;
