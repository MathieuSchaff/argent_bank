import type { RootState } from "../app/store";

export const selectorModal = (state: RootState) => state.modal;

export const selectCurentUser = (state: RootState) => state.user.user;

export const selectUserAuth = (state: RootState) => state.userAuth;
export const selectCurentToken = (state: RootState) => state.userAuth.token;
