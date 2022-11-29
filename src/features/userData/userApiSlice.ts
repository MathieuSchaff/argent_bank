import { apiSlice } from "../../app/api/apiSlice";
import type { IResponseToken } from "../../app/api/apiSlice";
interface UserData {
  data: any;
}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation<IResponseToken<UserData>, unknown>({
      query: () => ({
        url: "/profile",
        method: "POST",
      }),
    }),
  }),
});

export const { useGetUserMutation } = usersApiSlice;
