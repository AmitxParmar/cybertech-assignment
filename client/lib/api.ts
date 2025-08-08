import axios from "axios";

// Log the API URL for debugging
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // send/receive cookies
  timeout: 10000, // 10 second timeout
});

// Optional: attach Bearer if you store access token in memory
let accessToken: string | null = null;
/**
 * Set the access token to be used in API requests.
 *
 * Example:
 *   setAccessToken("your-jwt-token-here");
 *   // Now all future requests will include the Authorization header.
 *
 *   setAccessToken(null);
 *   // Removes the token from future requests.
 */
export const setAccessToken = (t: string | null) => (accessToken = t);

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);
