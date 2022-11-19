import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import fetchDataUserSlice from "../features/userData/fetchDataUserSlice";
import userAuth from "../features/login/userAuthSlice";
import modal from "../features/modal/modal";
export const store = configureStore({
  reducer: {
    userAuth: userAuth.reducer,
    modal: modal.reducer,
    user: fetchDataUserSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
