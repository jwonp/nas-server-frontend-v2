import eccrypto from "eccrypto";
import { createCipheriv, createDecipheriv } from "crypto";
type Credentials =
  | Record<"name" | "username" | "password" | "phone" | "icon", string>
  | undefined;
type EncryptPassword = {
  iv: string;
  ephemPublicKey: string;
  ciphertext: string;
  mac: string;
};
type EncryptedCredentials = {
  password: EncryptPassword;
  name?: string;
  username: string;
  phone?: string;
  icon?: string;
};
export const encryptCredentials = async (
  credentials: Credentials
): Promise<EncryptedCredentials | null> => {
  if (
    !(credentials && credentials.password && process.env.ECCRYPTO_PUBLIC_KEY)
  ) {
    return null;
  }

  const ECCRYPTO_PUBLIC_KEY = Buffer.from(
    process.env.ECCRYPTO_PUBLIC_KEY,
    "hex"
  );

  const encryptedPassword = await eccrypto.encrypt(
    ECCRYPTO_PUBLIC_KEY,
    Buffer.from(credentials.password)
  );

  const cryptedCredentials: EncryptedCredentials = {
    ...credentials,
    password: {
      iv: encryptedPassword.iv.toString("hex"),
      ephemPublicKey: encryptedPassword.ephemPublicKey.toString("hex"),
      ciphertext: encryptedPassword.ciphertext.toString("hex"),
      mac: encryptedPassword.mac.toString("hex"),
    },
  };

  return cryptedCredentials;
};

export const encryptObject = <T extends object>(object: T): string | null => {
  if (
    process.env.NEXT_PUBLIC_AES_256_CBC_ALGORITHM === undefined ||
    process.env.NEXT_PUBLIC_AES_256_CBC_KEY === undefined ||
    process.env.NEXT_PUBLIC_AES_256_CBC_IV === undefined
  ) {
    return `algorithm ${process.env.NEXT_PUBLIC_AES_256_CBC_ALGORITHM} | key ${process.env.NEXT_PUBLIC_AES_256_CBC_KEY} | iv ${process.env.NEXT_PUBLIC_AES_256_CBC_IV}`;
  }

  const stringifiedObject = JSON.stringify(object);
  const cipher = createCipheriv(
    process.env.NEXT_PUBLIC_AES_256_CBC_ALGORITHM,
    Buffer.from(process.env.NEXT_PUBLIC_AES_256_CBC_KEY, "hex"),
    Buffer.from(process.env.NEXT_PUBLIC_AES_256_CBC_IV, "hex")
  );
  const cipherText = cipher
    .update(stringifiedObject, "utf8", "base64")
    .concat(cipher.final("base64"));
  return cipherText;
};
export const decryptObject = (cipherText: string): string | null => {
  if (
    process.env.NEXT_PUBLIC_AES_256_CBC_ALGORITHM === undefined ||
    process.env.NEXT_PUBLIC_AES_256_CBC_KEY === undefined ||
    process.env.NEXT_PUBLIC_AES_256_CBC_IV === undefined
  ) {
    return null;
  }
  const decipher = createDecipheriv(
    process.env.NEXT_PUBLIC_AES_256_CBC_ALGORITHM,
    Buffer.from(process.env.NEXT_PUBLIC_AES_256_CBC_KEY, "hex"),
    Buffer.from(process.env.NEXT_PUBLIC_AES_256_CBC_IV, "hex")
  );
  const plainText = decipher
    .update(cipherText, "base64", "utf8")
    .concat(decipher.final("utf8"));

  return JSON.parse(plainText);
};