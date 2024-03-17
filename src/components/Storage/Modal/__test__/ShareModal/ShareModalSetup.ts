import { afterAll, afterEach, beforeAll } from "@jest/globals";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { UserSearchResponse } from "@/types/Responses";

const userSearchResponse: UserSearchResponse = {
  searchedUsers: [
    {
      iconURL: "https://placehold.co/600x400/EEE/31343C",
      userId: "useriid",
      username: "박주원",
      email: "user@test.com",
    },
  ],
};

export const restHandlers = [
  rest.get(`/api/user/search`, (req, res, ctx) => {
    const query = req.url.searchParams.get("query");
    if (query === "user@test.com") return res(ctx.json(userSearchResponse));
    return res(ctx.json({ searchedUsers: [] }));
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
