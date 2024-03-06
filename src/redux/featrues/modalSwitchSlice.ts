import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export type ModalSwitch = {
  isVisibleShareModal: boolean;
};

const initialState: ModalSwitch = {
  isVisibleShareModal: false,
};

export const modalSwitchSlice = createSlice({
  name: "modalSwitch",
  initialState,
  reducers: {
    turnOnShareModal: (state) => {
      state.isVisibleShareModal = true;
    },
    turnOffShareModal: (state) => {
      state.isVisibleShareModal = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { turnOnShareModal, turnOffShareModal } = modalSwitchSlice.actions;
export const getShareModalSwitch = (state: RootState) =>
  state.modalSwitch.isVisibleShareModal;

export default modalSwitchSlice.reducer;
