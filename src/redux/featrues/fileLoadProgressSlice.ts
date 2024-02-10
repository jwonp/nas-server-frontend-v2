import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
type ProgressPercent = {
  progressPercent: number;
};
const initialState: ProgressPercent = {
  progressPercent: 0,
};

export const fileLoadProgressSlice = createSlice({
  name: "fileLoadProgress",
  initialState,
  reducers: {
    setProgressPercent: (state, action: PayloadAction<number>) => {
      state.progressPercent = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProgressPercent } = fileLoadProgressSlice.actions;
export const getProgressPercent = (state: RootState) =>
  state.fileLoadProgress.progressPercent;

export default fileLoadProgressSlice.reducer;
