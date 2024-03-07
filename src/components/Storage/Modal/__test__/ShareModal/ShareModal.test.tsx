import { expect, test, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import ShareModal from "../../ShareModal";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

test("create modal items by search query", async () => {
  const queryClient = new QueryClient();
  const shareModal = render(
    <QueryClientProvider client={queryClient}>
      <ShareModal />
    </QueryClientProvider>
  );
  const searchInput = screen.getByRole("textbox");
  const modalItem = await vi.waitFor(async () => {
    fireEvent.change(searchInput, { target: { value: "user@test.com" } });

    expect((searchInput as HTMLInputElement).value).toBe("user@test.com");
    const modalItem = await screen.findByText("박주원");
    expect(modalItem).toBeDefined();
    return modalItem
  }, 1500);
  expect(screen.getByRole("modal-items")).toBeDefined();
  expect(searchInput).toBeDefined();

  expect(shareModal).toMatchSnapshot();

  cleanup();
});
