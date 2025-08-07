import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, setAccessToken } from "@/lib/api";
import { ApiResponse, User } from "@/types/types";

// Backend returns: { success, message, data: { user, token? } }

/* use logged in user data: returns: data, success, message */
export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<User>>("/auth/me");
      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to fetch user");
      }
      // The backend returns user fields inside data
      return res.data.data;
    },
    retry: false,
  });
}

/* Login mutation:  */
export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { email: string; password: string }) => {
      const res = await api.post<ApiResponse<{ user: User; token?: string }>>(
        "/auth/login",
        body
      );
      if (!res.data.success) {
        throw new Error(res.data.message || "Login failed");
      }
      if (res.data.data?.token) setAccessToken(res.data.data.token);
      return res.data.data?.user;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

/* Register mutation */
export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: {
      name: string;
      email: string;
      password: string;
      bio?: string;
    }) => {
      const res = await api.post<ApiResponse<{ user: User; token?: string }>>(
        "/auth/register",
        body
      );
      console.log(res);
      if (!res.data.success) {
        throw new Error(res.data.message || "Registration failed");
      }
      if (res.data.data?.token) setAccessToken(res.data.data.token);
      return res.data.data?.user;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

/* Logout mutation */
export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout"); // server clears HttpOnly cookie
      setAccessToken(null);
    },
    onSuccess: () => {
      qc.removeQueries({ queryKey: ["me"] });
    },
  });
}
