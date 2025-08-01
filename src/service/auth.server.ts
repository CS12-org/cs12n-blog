// TODO: Replace remix-auth with next-auth

import { createCookieSessionStorage, redirect } from "react-router";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import axios from "~/lib/axios";
import config from "~/lib/config";

type User = {
  id: number;
  jwt: string;
  name: string;
  email: string;
};

type AuthenticateResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

type SignupOptions = {
  email: string;
  username: string;
  password: string;
};

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    name: "__session",
    secrets: [config.SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const authenticator = new Authenticator<User>();

async function signup(options: SignupOptions): Promise<User> {
  const res = await axios.post<AuthenticateResponse>("/auth/local/register", {
    email: options.email,
    username: options.username,
    password: options.password,
  });

  return {
    jwt: res.data.jwt,
    id: res.data.user.id,
    email: res.data.user.email,
    name: res.data.user.username,
  };
}

async function login(identifier: string, password: string): Promise<User> {
  const res = await axios.post<AuthenticateResponse>("/auth/local", {
    identifier,
    password,
  });

  return {
    email: res.data.user.email,
    id: res.data.user.id,
    name: res.data.user.username,
    jwt: res.data.jwt,
  };
}

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const password = form.get("password") as string;
    const identifier = form.get("identifier") as string;
    if (!identifier || !password)
      throw new Error("Email and password are required");
    return await login(identifier, password);
  }),
  "user-pass-login",
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    if (!email || !password) throw new Error("Email and password are required");
    return await signup({ email, password, username: email.split("@")[0] });
  }),
  "user-pass-signup",
);

export async function authenticate(request: Request, navigate: boolean = true) {
  const cookies = request.headers.get("cookie");
  const session = await sessionStorage.getSession(cookies);
  const user = session.get("user") as User;
  if (user) return user;
  if (navigate) throw redirect("/login");
  return null;
}
