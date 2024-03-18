import { expect, test } from "vitest";
// import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { SIGNIN_PASSWORD_REGEX_PATTERN } from "@/utils/strings";

test("Chekc signin password input with RegEx pattern", async () => {
  const passwordRegEx = new RegExp(SIGNIN_PASSWORD_REGEX_PATTERN);
  // 8 ~ 32 characters with Alphabet, number, special symbols like _ ! @ # $ % ^ * + = -
  expect(passwordRegEx.exec("1234qwer!@")).toBeTruthy();
  
  expect(passwordRegEx.exec("1234qwer")).toBeFalsy();
  expect(passwordRegEx.exec("qwer!@")).toBeFalsy();
  expect(passwordRegEx.exec("1234!@")).toBeFalsy();
  expect(passwordRegEx.exec("12qw!@")).toBeFalsy();
  
  // 7 characters -> to be false
  expect(passwordRegEx.exec("123qwe!")).toBeFalsy();
  // 8 characters -> to be true
  expect(passwordRegEx.exec("123qwe!@")).toBeTruthy();
  // 32 characters -> to be true
  expect(passwordRegEx.exec("1234qwer!@1234qwer!@1234qwer!@12")).toBeTruthy();
  // 33 characters -> to be false
  expect(passwordRegEx.exec("1234qwer!@1234qwer!@1234qwer!@123")).toBeFalsy();

});
