import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomBytes, randomUUID } from "crypto";

import { encryptCredentials } from "@/utils/encrypt";
import { request } from "@/utils/request";
import { UserSession } from "@/types/UserSession";
import { AxiosError } from "axios";
import { ErrorResponse, SuccessResponse } from "@/types/Responses";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        phone: { label: "Phone", type: "text" },
        icon: { label: "icon", type: "text" },
      },
      type: "credentials",
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        /** if sign up
         * {
                csrfToken: '52ff7143053a22b3a310cfd2ee8e7a164f31465e2466051957cb06f343502236',
                username: 'tkdel222@gmail.com',
                password: '123qweasd!@',
                name: '박주원',
                'profile-icon': '【PC版】2022年6月メンバー限定壁紙.jpg',
                icon: '66682ca6-f912-4986-95a9-41bb9a9197e3.jpeg',
                phone: '01012312312'
            }
         */
        const dumySession: UserSession = {
          id: "",
          username: "",
          name: "",
          icon: "",
          image: "",
          phone: "",
        };
        if (credentials?.phone && credentials?.name) {
          const encryptedCredentials = await encryptCredentials(credentials);
          if (encryptedCredentials) {
            const encryptedUserDetail = {
              username: encryptedCredentials.username,
              password: encryptedCredentials.password,
              name: encryptedCredentials.name,
              icon: encryptedCredentials.icon,
              phone: encryptedCredentials.phone,
            };
            const res = await request(dumySession)
              .post(`/user/signup`, encryptedUserDetail)
              .then((res) => {
                return { status: res.status, data: res.data };
              })
              .catch((err: AxiosError) => {
                return { status: err.status, msg: err.message };
              });

            return res.status === 200
              ? (res as SuccessResponse).data
              : (res as ErrorResponse);
          }
          return null;
        }

        const encryptedCredentials = await encryptCredentials(credentials);

        const res = await request(dumySession)
          .post(`/user/signin`, encryptedCredentials)
          .then((res) => {
            return { data: res.data, status: res.status };
          })
          .catch((err: AxiosError) => {
            return { status: err.status, msg: err.message };
          });
        const user = (res as SuccessResponse).data;
        console.log("get user");
        console.log(user);
        // If no error and we have user data, return it
        if (res.status === 200 && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  pages: {
    signIn: "/auth/signin", // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: "/auth/new-user", // If set, new users will be directed here on first sign in
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      if (user.username && user.name && user.icon && user.phone) {
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      return `${process.env.FRONTEND_ENDPOINT as string}/storage`;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.email = user.username;
        token.picture = user.icon;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = (token.id as string) ?? (token.sub as string);
      return session;
    },
  },

  events: {
    async signIn({ user, account, profile, isNewUser }) {
      /* on successful sign in */
    },
    //   async signOut(message) { /* on signout */ },
    async createUser(message) {
      /* user created */
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
    },
    async linkAccount(message) {
      /* account (e.g. Twitter) linked to a user */
    },
    // async session(message: any) {},
  },

  debug: true,
};

export default NextAuth(authOptions);
