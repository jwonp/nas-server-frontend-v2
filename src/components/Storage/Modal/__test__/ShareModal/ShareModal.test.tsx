import { expect, test, vi } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import ShareModal from "../../ShareModal";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "@/redux/store";

test("create modal items by search query", async () => {
  const queryClient = new QueryClient();
  const preloadedState = {
    modalSwitch: {
      share: {
        isVisible: true,
        title: "test file",
      },
    },
  };
  const store = configureStore({ reducer, preloadedState });
  const shareModal = render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ShareModal />
      </QueryClientProvider>
    </Provider>
  );
  const searchInput = screen.getByRole("textbox");
  const modalItem = await vi.waitFor(async () => {
    fireEvent.change(searchInput, { target: { value: "user@test.com" } });

    expect((searchInput as HTMLInputElement).value).toBe("user@test.com");
    const modalItem = await screen.findByText("박주원");
    expect(modalItem).toBeDefined();
    return modalItem;
  }, 1500);
  expect(screen.getByRole("modal-items")).toBeDefined();
  expect(searchInput).toBeDefined();
  cleanup();
});
