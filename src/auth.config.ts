import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface ExtendedUser {
  id: string;
  username: string;
  email: string;
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  isProfileCompleted: boolean;
}

export interface ExtendedToken {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  id: string;
  username: string;
  email: string;
  isProfileCompleted: boolean;
  error: string;
}

const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !process.env.BACKEND_URL
        )
          return null;

        const authenticationUrl = new URL(
          "/api/auth/login",
          process.env.BACKEND_URL,
        ).toString();

        try {
          const res = await axios
            .post(authenticationUrl, {
              usernameOrEmail: credentials.email,
              password: credentials.password,
            })
            .then((res) => res.data.data);

          if (res.id) {
            return {
              id: res.id,
              email: res.email,
              username: res.username,
              isProfileCompleted: res.isProfileCompleted,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
              accessTokenExpires: res.accessTokenExpires,
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as ExtendedUser;

        return {
          ...token,
          email: u.email,
          username: u.username,
          accessToken: u.accessToken,
          refreshToken: u.refreshToken,
          accessTokenExpires: u.accessTokenExpires,
          isProfileCompleted: u.isProfileCompleted,
        } as Partial<ExtendedToken>;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email as string;
      session.user.username = token.username as string;
      session.accessToken = token.accessToken as string;
      session.isProfileCompleted = token.isProfileCompleted as boolean;

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export default authOptions;
