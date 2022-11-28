import { RootState } from "./../store";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../../features/auth/authSlice";
import {
  BaseQueryApi,
  QueryReturnValue,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
export type BaseQueryFn<
  Args = any,
  Result = unknown,
  Error = unknown,
  DefinitionExtraOptions = {},
  Meta = {}
> = (
  args: Args,
  api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions
) => MaybePromise<QueryReturnValue<Result, Error, Meta>>;
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api/v1/user",
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithAuthAndLogout: BaseQueryFn<
//   string, // Args
//   unknown, // Result
//   { reason: string }, // Error
//   { shout?: boolean }, // DefinitionExtraOptions
//   { timestamp: number } // Meta
// > = async (arg, api, extraOptions) => {
//   // `arg` has the type `string`
//   // `api` has the type `BaseQueryApi` (not configurable)
//   // `extraOptions` has the type `{ shout?: boolean }
//   let result = await baseQuery(arg, api, extraOptions);
//   if (result.error && result.error.status === 401) {
//     api.dispatch(logout());
//   }
//   return result;
// };

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions)

//   if (result?.error?.originalStatus === 403) {
//       console.log('sending refresh token')
//       // send refresh token to get new access token
//       const refreshResult = await baseQuery('/refresh', api, extraOptions)
//       console.log(refreshResult)
//       if (refreshResult?.data) {
//           const user = api.getState().auth.user
//           // store the new token
//           api.dispatch(setCredentials({ ...refreshResult.data, user }))
//           // retry the original query with new access token
//           result = await baseQuery(args, api, extraOptions)
//       } else {
//           api.dispatch(logOut())
//       }
//   }

//   return result
// }
const baseQueryWithAuthAndLogout = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
