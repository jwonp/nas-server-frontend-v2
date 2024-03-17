import { UserCredentials } from "@/types/UserCredentials";
import { expect, test,beforeEach ,afterAll,jest} from "@jest/globals";
import { decryptObject, encryptObject } from "../crypto";


test("test encrypto/decrypto object", () => {
  expect(process.env.AES_256_CBC_ALGORITHM).toBeTruthy();
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
