import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`, // or your backend URL
  withCredentials: true, // send/receive cookies
});

// Optional: attach Bearer if you store access token in memory
let accessToken: string | null = null;
export const setAccessToken = (t: string | null) => (accessToken = t);

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
