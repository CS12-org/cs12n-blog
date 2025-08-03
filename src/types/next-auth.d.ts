declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      id: string;
      name: string;
      jwt: string;
    };
    expires: string;
  }

  interface JWT {
    accessToken: string;
    id: string;
    email: string;
  }
}

// Add this to ensure the file is treated as a module
export {};
