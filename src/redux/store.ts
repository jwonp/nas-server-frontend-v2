import { configureStore } from "@reduxjs/toolkit";
import sideBarVisibleReducer from "./featrues/sideBarVisibleSlice";
import fileLoadProgressReducer from "./featrues/fileLoadProgressSlice";
import snackBarSwitchReducer from "./featrues/snackBarSwitchSlice";
import modalSwitchReducer from "./featrues/modalSwitchSlice";
import mediaReducer from "./featrues/mediaSlice";
import windowWidthReducer from "./featrues/windowWidthSlice";
export const reducer = {
  sideBarVisible: sideBarVisibleReducer,
  fileLoadProgress: fileLoadProgressReducer,
  snackBarSwitch: snackBarSwitchReducer,
  modalSwitch: modalSwitchReducer,
  media: mediaReducer,
  windowWidth: windowWidthReducer,
};

export const store = configureStore({
  reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
