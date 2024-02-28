import { expect, test } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import DirectoryHistory from "../DirectoryHistory";
import {
  HISTORY_BLOCKS_FAIL_TO_LOAD_HISTORIES,
  ROOT_DISPLAY_DIRECTORY,
} from "@/utils/strings";

test("Alert error when items got ErrorResponse ", () => {
  render(
    <DirectoryHistory
      rowHistories={[]}
      isLoading={false}
      //@ts-ignore
      items={{ status: 500, msg: "Server" }}
    />
  );
  expect(screen.getByText(HISTORY_BLOCKS_FAIL_TO_LOAD_HISTORIES)).toBeDefined();
  cleanup();
});

test("Display root history block when it is root directory", () => {
  render(
    <DirectoryHistory
      rowHistories={[]}
      histories={[{ key: "folder$abc", title: "bcd" }]}
      isLoading={false}
    />
  );
  expect(screen.getByText(ROOT_DISPLAY_DIRECTORY)).toBeDefined();
  cleanup();
});
test("Display root history block when it is no histories", () => {
  render(
    <DirectoryHistory
      rowHistories={[]}
      histories={undefined}
      isLoading={false}
    />
  );
  expect(screen.getByText(ROOT_DISPLAY_DIRECTORY)).toBeDefined();
  cleanup();
});
test("Loading and provided init histories", () => {
  render(
    <DirectoryHistory
      rowHistories={["a", "b", "c"]}
      initHistories={[
        { key: "folder$a", title: "folderA" },
        { key: "folder$b", title: "folderB" },
        { key: "folder$c", title: "folderC" },
      ]}
      isLoading={true}
    />
  );
  expect(screen.getByText("/ folderA")).toBeDefined();
  expect(screen.getByText("/ folderB")).toBeDefined();
  expect(screen.getByText("/ folderC")).toBeDefined();
  cleanup();
});
test("In noraml case", () => {
  render(
    <DirectoryHistory
      rowHistories={["a", "b", "c"]}
      histories={[
        { key: "folder$a", title: "folderA" },
        { key: "folder$b", title: "folderB" },
        { key: "folder$c", title: "folderC" },
      ]}
      isLoading={false}
    />
  );
  expect(screen.getByText("/ folderA")).toBeDefined();
  expect(screen.getByText("/ folderB")).toBeDefined();
  expect(screen.getByText("/ folderC")).toBeDefined();
  cleanup();
});
