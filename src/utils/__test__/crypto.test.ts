import { UserCredentials } from "@/types/UserCredentials";
import { expect, test } from "vitest";
import { decryptObject, encryptObject } from "../crypto";
import "dotenv/config";
require("dotenv").config();

test("test encrypto/decrypto object", () => {
  
  
  const obj: UserCredentials = {
    name: "Park Joo Won",
    username: "joowon@ikiningyou.com",
    password: "super123!@password56",
    phone: "01054533251",
    icon: "",
  };
  const cipherText = encryptObject(obj);

  if (cipherText === null) {
    return;
  }
  expect(decryptObject(cipherText)).toMatchObject(obj);
});
