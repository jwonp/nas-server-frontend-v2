import { configureStore } from "@reduxjs/toolkit";
import sideBarVisibleReducer from "./featrues/sideBarVisibleSlice";
import fileLoadProgressReducer from "./featrues/fileLoadProgressSlice";
import snackBarSwitchReducer from "./featrues/snackBarSwitchSlice";
import modalSwitchReducer from "./featrues/modalSwitchSlice";
export const store = configureStore({
  reducer: {
    sideBarVisible: sideBarVisibleReducer,
    fileLoadProgress: fileLoadProgressReducer,
    snackBarSwitch: snackBarSwitchReducer,
    modalSwitch: modalSwitchReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
