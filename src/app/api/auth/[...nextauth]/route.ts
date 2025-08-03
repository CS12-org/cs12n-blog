import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "~/lib/axios";
import { serverConfig } from "~/lib/server-config";

interface User {
  id: string;
  name: string;
  email: string;
  jwt: string;
}

export const authOptions: NextAuthOptions = {
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
          const res = await axios.post("/auth/local", {
            identifier: credentials.email,
            password: credentials.password,
          });
          const user = res.data.user;
          if (user && res.data.jwt) {
            return {
              id: user.id,
              name: user.username,
              email: user.email,
              jwt: res.data.jwt,
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
      console.log("jwt", token, user);
      if (user) {
        const u = user as User;
        token.id = u.id;
        token.jwt = u.jwt;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session", session, token);
      if (token && session.user) {
        (
          session.user as typeof session.user & { id?: string; jwt?: string }
        ).id = token.id as string;
        (
          session.user as typeof session.user & { id?: string; jwt?: string }
        ).jwt = token.jwt as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
