import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface WindowWidthState {
  width: any;
}

const initialState: WindowWidthState = {
  width: 0,
};

export const windowWidth = createSlice({
  name: "windowWidth",
  initialState,
  reducers: {
    setWidth: (state, actions) => {
      state.width = actions.payload;
    },
  },
});

export const { setWidth } = windowWidth.actions;

export const getWindowWidth = (state: RootState) => state.windowWidth;
export const getWidth = (state: RootState) => state.windowWidth.width;

export default windowWidth.reducer;
