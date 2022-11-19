export const selectorModal = (state) => state.modal;

export const selectCurentUser = (state) => state.user.user;

export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;
export const selectUserAuth = (state) => state.userAuth;
export const selectCurentToken = (state) => state.userAuth.token;
