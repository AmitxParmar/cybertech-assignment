import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { ApiResponse, Post } from "@/types/types";

async function getData<T>(url: string) {
  const res = await api.get<ApiResponse<T>>(url);
  console.log(`getting data of ${url}`, res);
  return res.data.data as T;
}

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => await getData("/api/posts"),
  });
}

/* Fetch user by id */
export const usePostsById = (id: string | number) => {
  return useQuery<Post[]>({
    queryKey: ["profile-posts", id],
    queryFn: () => getData(`/api/posts/user/${id}`),
    enabled: !!id, // Prevent query from running if id is falsy
  });
};

/* Fetch home feed, posts of all the users */
export function useFeed() {
  return useQuery<Post[]>({
    queryKey: ["feed"],
    queryFn: async () => await getData("/api/posts/feed"),
  });
}

/* Mutation to create a post */
export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (content: string) => {
      const payload = typeof content === "string" ? { content } : content;
      const { data } = await api.post<ApiResponse<Post>>("/api/posts", payload);
      return data.data; // data.data is the new post
    },
    onSuccess: (newPost) => {
      // Update the "posts" cache with the new post at the start
      qc.setQueryData<Post[]>(["posts"], (old) => {
        if (!old) return newPost ? [newPost] : [];
        return newPost ? [newPost, ...old] : old;
      });
      // Also update the "feed" cache if it exists
      qc.setQueryData<Post[]>(["feed"], (old) => {
        if (!old) return newPost ? [newPost] : [];
        return newPost ? [newPost, ...old] : old;
      });
    },
  });
}
