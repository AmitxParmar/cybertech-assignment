"use client";
import { api } from "@/lib/api";
import { ApiResponse, Post, User } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getUserProfileData(userId: string) {
  const res = await api.get(`/api/users/${userId}`);
  console.log("Full response:", res);
  console.log("Response data:", res.data);

  // Check if the response has the expected structure
  if (res.data && res.data.data) {
    return res.data.data;
  } else if (res.data && res.data.user && res.data.posts) {
    // Fallback: if data is directly in res.data
    return res.data;
  } else {
    console.error("Unexpected response structure:", res.data);
    throw new Error("Invalid response structure");
  }
}

// Pass userId as an argument to the hook and use it in the query key and API call
export function useUserProfile(userId: string) {
  return useQuery<{ user: User | null; posts: Post[] }>({
    queryKey: ["user-profile", userId],
    queryFn: () => getUserProfileData(userId),
    enabled: !!userId,
    retry: 2,
  });
}

type UpdateProfileInput = {
  name?: string;
  bio?: string;
};

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateProfileInput) => {
      const res = await api.patch<ApiResponse<User>>("/api/users/me", data);
      return res.data.data;
    },
    onSuccess: (updatedUser) => {
      // Invalidate or update relevant queries, e.g. user-profile
      qc.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
}
