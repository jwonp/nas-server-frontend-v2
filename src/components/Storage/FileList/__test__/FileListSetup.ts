import { beforeAll, jest } from "@jest/globals";
beforeAll(() => {
  jest.mock("next/router", () => require("next-router-mock"));
})