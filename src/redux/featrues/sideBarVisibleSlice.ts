import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  isVisibleSideBar: false,
};

export const sideBarVisibleSlice = createSlice({
  name: "sideBarVisible",
  initialState,
  reducers: {
    visibleSideBar: (state) => {
      state.isVisibleSideBar = true;
    },
    invisibleSideBar: (state) => {
      state.isVisibleSideBar = false;
    },
    setVisibleSideBar: (state, action: PayloadAction<boolean>) => {
      state.isVisibleSideBar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { visibleSideBar, invisibleSideBar, setVisibleSideBar } =
  sideBarVisibleSlice.actions;
export const getVisibleSideBar = (state: RootState) =>
  state.sideBarVisible.isVisibleSideBar;

export default sideBarVisibleSlice.reducer;
