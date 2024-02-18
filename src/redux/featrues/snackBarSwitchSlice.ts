import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export type SnackBarProps = {
  isVisible: boolean;
  message: string;
};
type SnackBar = {
  [key: string]: SnackBarProps;
};
const initialState: SnackBar = {
  warning: {
    isVisible: false,
    message: "",
  },
};

export const snackBarSwitchSlice = createSlice({
  name: "snackBarSwitch",
  initialState,
  reducers: {
    setWarningSnackBar: (state, action: PayloadAction<SnackBarProps>) => {
      state.warning.isVisible = action.payload.isVisible;
      state.warning.message = action.payload.message;
    },
    resetWarningSnackBar:(state)=>{
        state.warning.isVisible = false;
        state.warning.message = "";
    }
  },
});

// Action creators are generated for each case reducer function
export const { setWarningSnackBar,resetWarningSnackBar } = snackBarSwitchSlice.actions;
export const getWarningSnackBar = (state: RootState) =>
  state.snackBarSwitch.warning;

export default snackBarSwitchSlice.reducer;
