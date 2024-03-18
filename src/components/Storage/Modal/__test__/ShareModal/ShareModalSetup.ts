import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, graphql, http } from "msw";
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
  http.get(`/api/user/search?query=user@test.com`, () => {
    return HttpResponse.json(userSearchResponse);
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
