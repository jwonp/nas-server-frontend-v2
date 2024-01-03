import eccrypto from "eccrypto";
type Credentials =
  | Record<"name" | "username" | "password" | "phone" | "icon", string>
  | undefined;
type EncryptedCredentials = {
  password: eccrypto.Ecies;
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
    JSON.parse(process.env.ECCRYPTO_PUBLIC_KEY)
  );

  const encryptedPassword = await eccrypto.encrypt(
    ECCRYPTO_PUBLIC_KEY,
    Buffer.from(credentials.password)
  );

  const cryptedCredentials: EncryptedCredentials = {
    ...credentials,
    password: encryptedPassword,
  };

  return cryptedCredentials;
};
