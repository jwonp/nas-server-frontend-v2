import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id:string;
      username: string;
      name: string;
      icon: string;
      image:string
      phone: string;
    };
  }
  interface User {
    id:string;
    username: string;
    name: string;
    icon: string;
    phone: string;
  }
}
