import { UserSession } from "@/types/UserSession";
import axios from "axios";
import { createJWT } from "./jwt";

export const request = (user: UserSession) => {
  const instance = axios.create({
    baseURL: process.env.BACKEND_ENDPOINT,
    timeout: 3000,
    headers: { Authorization: `Bearer ${createJWT(user)}` },
  });
  return instance;
};
