import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { ApiResponse, Post } from "@/types/types";

async function getData<T>(url: string) {
  const res = await api.get<ApiResponse<T>>(url);
  return res.data.data as T;
}

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => await getData("/posts"),
  });
}

/* Fetch user by id */
export const usePostsById = (id: string | number) => {
  return useQuery<Post[]>({
    queryKey: ["post", id],
    queryFn: () => getData(`/posts/user/${id}`),
    enabled: !!id, // Prevent query from running if id is falsy
  });
};

export function useFeed() {
  return useQuery<Post[]>({
    queryKey: ["feed"],
    queryFn: async () => await getData("/posts/feed"),
  });
}

/* Mutation to create a post */
export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (content: string) => {
      // Ensure the payload is always an object with a content property
      const payload = typeof content === "string" ? { content } : content;
      const { data } = await api.post<Post>("/posts", payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
