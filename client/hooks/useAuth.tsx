import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, setAccessToken } from "@/lib/api";
import { ApiResponse, User } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { success } from "zod";
// Backend returns: { success, message, data: { user, token? } }

/* use logged in user data: returns: data, success, message */
/**
 * Only runs if `enabled` is true.
 * Pass `enabled` as a parameter to control when the query runs.
 * Example: useMe({ enabled: isLoggedIn })
 */
export function useMe(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get<ApiResponse<User>>("/api/auth/me");
      if (!res.data.success) {
        throw new Error(res.data.message || "Failed to fetch user");
      }
      // The backend returns user fields inside data
      return res.data.data;
    },
    retry: false,
    enabled: options?.enabled ?? false, // default: disabled unless enabled is true
  });
}

/* Login mutation:  */
export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { email: string; password: string }) => {
      const res = await api.post<ApiResponse<{ user: User; token?: string }>>(
        "/api/auth/login",
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
        "/api/auth/register",
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

export function useAuthRedirect({
  enabled = true,
}: { enabled?: boolean } = {}) {
  const router = useRouter();
  const { data, error, isLoading, status } = useMe({ enabled });

  useEffect(() => {
    if (!isLoading && error) {
      console.log(error.message);
      router.replace("/login");
    }
  }, [error, isLoading, router]);
  console.log(status === "success");
  return {
    user: data,
    isLoading,
    error,
    isAuthenticated: status === "success",
  };
}

/* Logout mutation */
export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.post("/api/auth/logout"); // server clears HttpOnly cookie
      setAccessToken(null);
    },
    onSuccess: () => {
      qc.removeQueries({ queryKey: ["me"] });
    },
  });
}
