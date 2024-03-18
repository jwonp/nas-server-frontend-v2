import eccrypto from "eccrypto";
type Credentials =
  | Record<"name" | "username" | "password" | "phone" | "icon", string>
  | undefined;
type EncryptPassword = {
  iv: string;
  ephemPublicKey: string;
  ciphertext: string;
  mac: string;
}
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
    password:{
      iv: encryptedPassword.iv.toString("hex"),
      ephemPublicKey: encryptedPassword.ephemPublicKey.toString("hex"),
      ciphertext: encryptedPassword.ciphertext.toString("hex"),
      mac: encryptedPassword.mac.toString("hex")
    },
  };

  return cryptedCredentials;
};
