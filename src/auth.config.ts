import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import serverConfig from "~/lib/server-config";

interface User {
  id: string;
  name: string;
  email: string;
  jwt: string;
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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const res = await axios.post(
            `${process.env.BACKEND_URL}/api/auth/login`,
            {
              usernameOrEmail: credentials.email,
              password: credentials.password,
            }
          );
          const user = res.data.data.email;
          if (user && res.data) {
            return {
              id: user.id,
              email: user.email,
              username: user.username,
              isProfileCompleted: res.data.isProfileCompleted,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              tokenType: res.data.tokenType,
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  secret: serverConfig.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as User;
        token.id = u.id;
        token.jwt = u.jwt;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (
          session.user as typeof session.user & {
            id?: string;
            accessToken?: string;
            email?: string;
            username?: string;
            isProfileCompleted?: boolean;
            refreshToken?: string;
          }
        ).id = token.id as string;
        (
          session.user as typeof session.user & {
            id?: string;
            accessToken?: string;
            email?: string;
            username?: string;
            isProfileCompleted?: boolean;
            refreshToken?: string;
          }
        ).accessToken = token.accessToken as string;
        (
          session.user as typeof session.user & {
            id?: string;
            accessToken?: string;
            email?: string;
            username?: string;
            isProfileCompleted?: boolean;
            refreshToken?: string;
          }
        ).email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export default authOptions;
