declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
    email: string;
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    isProfileCompleted: boolean;
  }

  interface Session {
    accessToken: string;

    user: {
      id: string;
      email: string;
      username: string;
      isProfileCompleted: boolean;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    username: string;
    isProfileCompleted: boolean;

    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

export {};
