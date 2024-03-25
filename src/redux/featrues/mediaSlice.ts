import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Media = {
  src: string;
  title: string;
  isVisible: boolean;
};
export type ModalSwitch = {
  isVisibleMediaModal: boolean;
  image: Media;
  video: Media;
};
const initialImageState: Media = {
  src: "",
  title: "",
  isVisible: false,
};
const initialVideoState: Media = {
  src: "",
  title: "",
  isVisible: false,
};
const initialState: ModalSwitch = {
  isVisibleMediaModal: false,
  image: initialImageState,
  video: initialVideoState,
};

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setImageMedia: (state, action: PayloadAction<Omit<Media, "isVisible">>) => {
      state.isVisibleMediaModal = true;

      state.image.isVisible = true;
      state.image.src = action.payload.src;
      state.image.title = action.payload.title;
    },
    setVideoMedia: (state, action: PayloadAction<Omit<Media, "isVisible">>) => {
      state.isVisibleMediaModal = true;
      
      state.video.isVisible = true;
      state.video.src = action.payload.src;
      state.video.title = action.payload.title;
    },
    resetMediaModal: (state) => {
      state.isVisibleMediaModal = false;

      state.image.isVisible = initialImageState.isVisible;
      state.image.src = initialImageState.src;
      state.image.title = initialImageState.title;

      state.video.isVisible = initialVideoState.isVisible;
      state.video.src = initialVideoState.src;
      state.video.title = initialVideoState.title;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setImageMedia, setVideoMedia, resetMediaModal } =
  mediaSlice.actions;
export const getVisibleMediaModal = (state: RootState) =>
  state.media.isVisibleMediaModal;
export const getImageMedia = (state: RootState) => state.media.image;
export const getVideoMedia = (state: RootState) => state.media.video;
export const getMedia = (state: RootState) => state.media;
export default mediaSlice.reducer;
