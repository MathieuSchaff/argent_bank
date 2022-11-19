import { createSlice } from "@reduxjs/toolkit";
export interface Modal {
  isOpen: boolean;
}
const initialState: Modal = { isOpen: false };
const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalAction: (state) => {
      state.isOpen = true;
    },
    closeModalAction: (state) => {
      state.isOpen = false;
    },
  },
});
export default modal;
export const { openModalAction, closeModalAction } = modal.actions;
