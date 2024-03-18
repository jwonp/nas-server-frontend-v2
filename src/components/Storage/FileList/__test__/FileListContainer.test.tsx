import { expect, test } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import FileListContainer from "../FileListContainer";
import { MetaData } from "@/types/MetaData";
import {
  FILE_LIST_ERROR_LOAD_FILES,
  FILE_LIST_INVAILD_DIRECTORY,
  FILE_LIST_LOADING,
} from "@/utils/strings";
import { ErrorResponse, ItemResponse } from "@/types/Responses";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const histories = [
  { key: "folder$a", title: "folderA" },
  { key: "folder$b", title: "folderB" },
  { key: "folder$c", title: "folderC" },
];
const metas: Omit<MetaData, "ownerId">[] = [
  {
    directory: "/a/b/c",
    fileName: "file.pdf",
    key: "/storage/userId/a/b/c/fileId.pdf",
    uploadTime: 1709129585257,
    type: "file",
    size: 331226,
    isFavorite:false
  },
  {
    directory: "/a/b/c",
    fileName: "image.png",
    key: "/storage/userId/a/b/c/imageId.png",
    uploadTime: 1709129585258,
    type: "image",
    size: 131226,
    isFavorite:false
  },
  {
    directory: "/a/b/c",
    fileName: "video.mp4",
    key: "/storage/userId/a/b/c/videoId.mp4",
    uploadTime: 1709129585259,
    type: "video",
    size: 1331226,
    isFavorite:false
  },
];
const initItems: ItemResponse = {
  histories: histories,
  items: {
    id: "userId",
    username: "userName",
    image: "icon/asdasd.png",
    files: metas,
  },
};
const initError: ErrorResponse = {
  msg: "Invaild Directory",
  status: 404,
};
const data: ItemResponse = {
  histories: histories,
  items: {
    id: "userId",
    username: "userName",
    image: "icon/asdasd.png",
    files: metas,
  },
};

test("When loading", () => {
  render(
    <FileListContainer
      isLoading={true}
      initItems={initItems}
      data={undefined}
      userId={"userId"}
      directory={"/a/b/c"}
    />
  );
  expect(screen.getByText(FILE_LIST_LOADING)).toBeDefined();
  cleanup();
});

test("When erorr to load file list", () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <FileListContainer
        isLoading={false}
        initItems={initItems}
        data={undefined}
        userId={"userId"}
        directory={"/a/b/c"}
      />
    </QueryClientProvider>
  );
  expect(screen.getByText(FILE_LIST_ERROR_LOAD_FILES)).toBeDefined();
  cleanup();
});

test("When invaild directory", () => {
  render(
    <FileListContainer
      isLoading={false}
      initItems={initError}
      data={initError}
      userId={"userId"}
      directory={"/a/b/c"}
    />
  );
  expect(screen.getByText(FILE_LIST_INVAILD_DIRECTORY)).toBeDefined();
  cleanup();
});

test("In normal case", () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <FileListContainer
          isLoading={false}
          initItems={initItems}
          data={data}
          userId={"userId"}
          directory={"/a/b/c"}
        />
      </Provider>
    </QueryClientProvider>
  );
  expect(screen.getByText("image.png")).toBeDefined();
  expect(screen.getByText("video.mp4")).toBeDefined();
  expect(screen.getByText("file.pdf")).toBeDefined();

  cleanup();
});
