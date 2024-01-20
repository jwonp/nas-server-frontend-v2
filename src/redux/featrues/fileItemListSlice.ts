import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MetaData } from "@/types/MetaData";
type FileItemList = {
fileItemList:Omit<MetaData, "ownerId">[]
}
const initialState:FileItemList = {
  fileItemList: [],
};

export const fileItemListSlice = createSlice({
  name: "fileItemList",
  initialState,
  reducers: {
    setFileItemList :(state,action:PayloadAction<Omit<MetaData, "ownerId">[]>)=>{
      state.fileItemList = action.payload;
    },
    addFileItemList: (state,action:PayloadAction<Omit<MetaData, "ownerId">>) => {
      state.fileItemList = [...state.fileItemList, action.payload];
    },
    resetFileItemList: (state) => {
      state.fileItemList = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFileItemList, resetFileItemList} =
fileItemListSlice.actions;
export const getFileItemList = (state: RootState) =>
  state.fileItemList.fileItemList;

export default fileItemListSlice.reducer;
