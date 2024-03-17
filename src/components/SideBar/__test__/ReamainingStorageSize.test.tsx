import { expect, test } from "@jest/globals";
import { render, screen, cleanup } from "@testing-library/react";
import RemainingStorageSize from "../RemainingStorageSize";
import { VolumeSize } from "@/types/Volume";
import { STORAGE_SIZE_LOADING } from "@/utils/strings";
test("When loading", () => {
  render(
    <RemainingStorageSize
      isLoading={true}
      volume={undefined}
    />
  );
  expect(screen.getByText(STORAGE_SIZE_LOADING)).toBeDefined();
  cleanup();
});
test("In normal case", () => {
  const volume: VolumeSize = {
    max: 2000,
    now: 1000,
  };
  render(
    <RemainingStorageSize
      isLoading={false}
      volume={volume}
    />
  );
  expect(screen.getByText("2KB 중 1KB")).toBeDefined();
  expect(screen.getByText("(50.00%) 사용중")).toBeDefined();
  cleanup();
});
