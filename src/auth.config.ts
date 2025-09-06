import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import serverConfig from "~/lib/server-config";

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
          if (res.data.data.id) {
            const data = res.data.data;
            return {
              id: data.id,
              email: data.email,
              username: data.username,
              isProfileCompleted: data.isProfileCompleted,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              accessTokenExpires: data.accessTokenExpires,
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
        const u = user as ExtendedUser;
        return {
          ...token,
          accessToken: u.accessToken,
          refreshToken: u.refreshToken,
          accessTokenExpires: u.accessTokenExpires,
          email: u.email,
          username: u.username,
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
