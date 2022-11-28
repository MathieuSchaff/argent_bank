import { apiSlice } from "./apiSlice";
interface Credentials {
  email: string;
  password: string;
}
interface DataToken {
  token: string;
}
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<DataToken, Credentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
