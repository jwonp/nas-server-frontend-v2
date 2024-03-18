import { expect, test, vi } from "vitest";

import { SearchedUser } from "@/types/ComponentTypes";
import { addObjectElementOnArray, deleteObjectElementOnArray } from "../array";
const searchusers: SearchedUser[] = [
  {
    iconURL: "url-1",
    email: "email-1",
    userId: "userId-1",
    username: "username-1",
  },
  {
    iconURL: "url-2",
    email: "email-2",
    userId: "userId-2",
    username: "username-2",
  },
  {
    iconURL: "url-3",
    email: "email-3",
    userId: "userId-3",
    username: "username-3",
  },
  {
    iconURL: "url-4",
    email: "email-4",
    userId: "userId-4",
    username: "username-4",
  },
  {
    iconURL: "url-5",
    email: "email-5",
    userId: "userId-5",
    username: "username-5",
  },
  {
    iconURL: "url-6",
    email: "email-6",
    userId: "userId-6",
    username: "username-6",
  },
  {
    iconURL: "url-7",
    email: "email-7",
    userId: "userId-7",
    username: "username-7",
  },
];
test("test add element on array", () => {
  const array = [...searchusers];
  const userIds = [
    "userId-1",
    "userId-2",
    "userId-3",
    "userId-4",
    "userId-5",
    "userId-6",
    "userId-7",
  ];
  const includedSearchedUser = {
    iconURL: "url-6",
    email: "email-6",
    userId: "userId-6",
    username: "username-6",
  };
  const newSearchedUser = {
    iconURL: "url-8",
    email: "email-8",
    userId: "userId-8",
    username: "username-8",
  };
  // check origin
  expect(array.map((el) => el.userId)).toStrictEqual(userIds);

  // is ignored same element
  expect(
    addObjectElementOnArray<SearchedUser>(array, includedSearchedUser).map(
      (el) => el.userId
    )
  ).toStrictEqual([...userIds]);

  // is added element successfully
  expect(
    addObjectElementOnArray<SearchedUser>(array, newSearchedUser).map(
      (el) => el.userId
    )
  ).toStrictEqual([...userIds, newSearchedUser.userId]);

  // is no change on origin array
  expect(array.map((el) => el.userId)).toStrictEqual(userIds);
});
test("test delete element on array", () => {
  const array = [...searchusers];
  const userIds = [
    "userId-1",
    "userId-2",
    "userId-3",
    "userId-4",
    "userId-5",
    "userId-6",
    "userId-7",
  ];
  const targetElement: SearchedUser = {
    iconURL: "url-5",
    email: "email-5",
    userId: "userId-5",
    username: "username-5",
  };
  // check origin
  expect(array.map((el) => el.userId)).toStrictEqual(userIds);
  // is deleted  element by index successfully
  expect(
    deleteObjectElementOnArray(array, { index: 4 }).map((el) => el.userId)
  ).toStrictEqual([
    "userId-1",
    "userId-2",
    "userId-3",
    "userId-4",
    "userId-6",
    "userId-7",
  ]);
  expect(
    deleteObjectElementOnArray(array, {
      element: targetElement,
    }).map((el) => el.userId)
  ).toStrictEqual([
    "userId-1",
    "userId-2",
    "userId-3",
    "userId-4",
    "userId-6",
    "userId-7",
  ]);
  // is no change on origin array
  expect(array.map((el) => el.userId)).toStrictEqual(userIds);
});
