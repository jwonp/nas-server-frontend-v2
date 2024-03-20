import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { aC } from "vitest/dist/reporters-MmQN-57K.js";
export type Media = {
  isVisible: boolean;
  src: string;
  title: string;
};
export type ModalSwitch = {
  image: Media;
  video: Media;
};

const initialState: ModalSwitch = {
  image: { isVisible: false, src: "", title: "" },
  video: { isVisible: false, src: "", title: "" },
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setImageMedia: (state, action: PayloadAction<Omit<Media, "isVisible">>) => {
      state.image.isVisible = true;
      state.image.src = action.payload.src;
      state.image.title = action.payload.title;
    },
    setVideoMedia: (state, action: PayloadAction<Omit<Media, "isVisible">>) => {
      state.video.isVisible = true;
      state.video.src = action.payload.src;
      state.video.title = action.payload.title;
    },
    resetImageMedia: (state) => {
      state.image.isVisible = false;
      state.image.src = "";
      state.image.title = "";
    },
    resetVideoMedia: (state) => {
      state.video.isVisible = false;
      state.video.src = "";
      state.video.title = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setImageMedia,
  setVideoMedia,
  resetImageMedia,
  resetVideoMedia,
} = mediaSlice.actions;
export const getImageMedia = (state: RootState) => state.media.image;
export const getVideoMedia = (state: RootState) => state.media.video;

export default mediaSlice.reducer;
