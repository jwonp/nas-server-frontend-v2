import { configureStore } from "@reduxjs/toolkit";
import sideBarVisibleReducer from "./featrues/sideBarVisibleSlice";
import fileItemListReducer from "./featrues/fileItemListSlice";

export const store = configureStore({
  reducer: {
    sideBarVisible: sideBarVisibleReducer,
    fileItemList:fileItemListReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
