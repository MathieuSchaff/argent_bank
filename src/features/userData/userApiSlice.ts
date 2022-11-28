import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: () => ({
        url: "/profile",
        method: "POST",
      }),
    }),
  }),
});

export const { useGetUserMutation } = usersApiSlice;
