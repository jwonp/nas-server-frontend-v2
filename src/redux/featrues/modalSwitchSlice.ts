import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
export type ModalSwitch = {
  [key: string]: { isVisible: boolean; title: string };
};

const initialState: ModalSwitch = {
  share: { isVisible: false, title: "" },
};

export const modalSwitchSlice = createSlice({
  name: "modalSwitch",
  initialState,
  reducers: {
    turnOnShareModal: (state, action: PayloadAction<string>) => {
      state.share.isVisible = true;
      state.share.title = action.payload;
    },
    turnOffShareModal: (state) => {
      state.share.isVisible = false;
      state.share.title = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { turnOnShareModal, turnOffShareModal } = modalSwitchSlice.actions;
export const getShareModalSwitch = (state: RootState) =>
  state.modalSwitch.share;

export default modalSwitchSlice.reducer;
