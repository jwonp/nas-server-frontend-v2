import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
type FileAmount = {
  fileTotalAmount: number;
  fileCurrentAmount: number;
};
type ProgressPercent = {
  progressPercent: number;
  fileAmount: FileAmount;
};
const initialState: ProgressPercent = {
  progressPercent: -1,
  fileAmount: {
    fileTotalAmount: -1,
    fileCurrentAmount: -1,
  },
};

export const fileLoadProgressSlice = createSlice({
  name: "fileLoadProgress",
  initialState,
  reducers: {
    setProgressPercent: (state, action: PayloadAction<number>) => {
      state.progressPercent = action.payload;
    },
    resetProgressPercent: (state) => {
      state.progressPercent = -1;
    },
    setFileAmount: (state, action: PayloadAction<number>) => {
      state.fileAmount = {
        fileTotalAmount: action.payload,
        fileCurrentAmount: 0,
      };
    },
    increaseFileAmount: (state) => {
      state.fileAmount.fileCurrentAmount =
        state.fileAmount.fileCurrentAmount + 1;
    },
    resetFileAmount: (state) => {
      state.fileAmount = {
        fileTotalAmount: -1,
        fileCurrentAmount: -1,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProgressPercent,
  resetProgressPercent,
  setFileAmount,
  resetFileAmount,
  increaseFileAmount,
} = fileLoadProgressSlice.actions;
export const getProgressPercent = (state: RootState) =>
  state.fileLoadProgress.progressPercent;
export const getFileAmount = (state: RootState) =>
  state.fileLoadProgress.fileAmount;
export default fileLoadProgressSlice.reducer;
