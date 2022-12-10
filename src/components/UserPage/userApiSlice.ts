import { apiSlice } from "../../app/api/apiSlice";
import type { IResponseToken } from "../../app/api/apiSlice";
export interface UserData {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  updatedAt: string;
}

export const { useGetUserMutation } = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation<IResponseToken<UserData>, void>({
      query: () => ({
        url: "/profile",
        method: "POST",
      }),
    }),
  }),
});
