import { createSlice } from "@reduxjs/toolkit";

const modal = createSlice({
  name: "modal",
  initialState: { isOpen: false },
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
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
