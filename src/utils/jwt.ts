import { UserSession } from "@/types/UserSession";
import jwt from "jsonwebtoken";

export const createJWT = (user: UserSession) => {
  if (!process.env.JWT_SIGN_KEY) {
    return null;
  }
  const token = jwt.sign(user, process.env.JWT_SIGN_KEY, {
    expiresIn: "30s",
  });
  return token;
};
