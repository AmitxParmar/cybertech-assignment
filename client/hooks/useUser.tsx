"use client";
import { api } from "@/lib/api";
import { ApiResponse, Post, User } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

// Helper to extract the actual data from the ApiResponse
async function getUserProfileData(
  userId: string
): Promise<{ user: User; posts: Post[] }> {
  try {
    const res = await api.get(`/api/users/${userId}`);
    console.log("user profile data", res.data);

    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to fetch user profile");
    }

    if (!res.data.data) {
      throw new Error("User profile data not found");
    }

    // Return only the data property, which should be { user, posts }
    return res.data as { user: User; posts: Post[] };
  } catch (error: any) {
    console.error("Error fetching user profile:", error);

    // Handle specific error cases
    if (error.response?.status === 404) {
      throw new Error("User not found");
    }

    if (error.response?.status >= 500) {
      throw new Error("Server error occurred");
    }

    // Re-throw the original error if it's already an Error object
    if (error instanceof Error) {
      throw error;
    }

    // Handle network errors
    if (error.code === "NETWORK_ERROR" || error.code === "ERR_NETWORK") {
      throw new Error("Network error - please check your connection");
    }

    throw new Error(error.message || "Failed to fetch user profile");
  }
}

// Pass userId as an argument to the hook and use it in the query key and API call
export function useUserProfile(userId: string) {
  return useQuery<{ user: User; posts: Post[] }>({
    queryKey: ["user-profile", userId],
    queryFn: () => getUserProfileData(userId),
    retry: (failureCount, error: any) => {
      // Don't retry on 404 errors (user not found)
      if (error.message === "User not found") {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
