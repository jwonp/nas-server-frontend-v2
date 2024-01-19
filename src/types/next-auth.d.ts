import NextAuth, { DefaultSession } from "next-auth";
import UserSession from "@/types/UserSession"
declare module "next-auth" {
  interface Session {
    user: UserSession;
  }
  interface User {
    id:string;
    username: string;
    name: string;
    icon: string;
    phone: string;
  }
}
