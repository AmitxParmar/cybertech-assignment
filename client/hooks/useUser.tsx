import { api } from "@/lib/api";
import { ApiResponse, Post, User } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

async function getUserProfileData(userId: string) {
  const res = await api.get<ApiResponse<{ user: User; posts: Post[] }>>(
    `/users/${userId}`
  );
  return res.data.data;
}

// Pass userId as an argument to the hook and use it in the query key and API call
export function useUserProfile(userId: string | undefined) {
  return useQuery<{ user: User; posts: Post[] }>({
    queryKey: ["user-profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const data = await getUserProfileData(userId || "");
      if (!data) {
        throw new Error("User not found");
      }
      return data;
    },
  });
}
