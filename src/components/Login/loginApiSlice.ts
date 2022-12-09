import { apiSlice } from "../../app/api/apiSlice";
import type { IResponseToken } from "../../app/api/apiSlice";
interface Credentials {
  email: string;
  password: string;
}
export interface DataToken {
  token: string;
}
export const { useLoginMutation } = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponseToken<DataToken>, Credentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
