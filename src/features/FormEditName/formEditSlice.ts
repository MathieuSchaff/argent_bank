import { apiSlice } from "../../app/api/apiSlice";
import type { IResponseToken } from "../../app/api/apiSlice";
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
      IResponseToken<IUserFirstLastData>,
      IUserFirstLastData
    >({
      query: (changes) => ({
        url: "/profile",
        method: "PUT",
        body: changes,
      }),
    }),
  }),
});

export const { useChangeUserDataMutation } = formEditSlice;
