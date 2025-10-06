import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshAccessToken(refreshToken: string, token: JWT) {
  const res = await axios.post('https://cs12-back-cs12.kubarcloud.net/api/auth/refresh-token', { refreshToken });

  token.accessToken = res.data.accessToken;
  token.refreshToken = res.data.refreshToken;
  token.accessTokenExpires = res.data.accessTokenExpires;

  return token;
}

async function authorize(credentials: Record<string, string> | undefined) {
  if (!credentials?.email || !credentials?.password || !process.env.NEXT_PUBLIC_API_URL) return null;

  try {
    const res = await axios
      .post('https://cs12-back-cs12.kubarcloud.net/api/auth/login', {
        usernameOrEmail: credentials.email,
        password: credentials.password,
      })
      .then((res) => res.data.data);
    console.log(res);

    if (!res.id) return null;
    return res;
  } catch {
    return null;
  }
}

const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return authorize(credentials);
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: { strategy: 'jwt' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.username = user.username;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.isProfileCompleted = user.isProfileCompleted;
        return token;
      }

      if (Date.now() < token.accessTokenExpires) return token;

      const newTokens = await refreshAccessToken(token.refreshToken, token);
      return newTokens;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.isProfileCompleted = token.isProfileCompleted;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};

export default authOptions;
