import authOptions from '@/auth.config';
import Axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';

const axios = Axios.create({
  timeout: 30 * 1000, // 30 seconds
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.request.use(async (config) => {
  const session = await (typeof window === 'undefined' ? getServerSession(authOptions) : getSession());

  if (session?.accessToken && !config.headers.Authorization)
    config.headers.Authorization = `Bearer ${session.accessToken}`;

  return config;
});

export default axios;
