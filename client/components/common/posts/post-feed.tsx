"use client";

import { useFeed } from "@/hooks/usePosts";
import { useMe } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { PostCard } from "./post-card";
import { CreatePost } from "./create-post";

interface PostFeedProps {
  showCreatePost?: boolean;
}

export function PostFeed({ showCreatePost = true }: PostFeedProps) {
  const { data: posts, isLoading, error } = useFeed();
  const me = useMe();
  console.log("feed content", posts);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Failed to load posts. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showCreatePost && !me.error && <CreatePost />}

      {posts?.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No posts yet. Be the first to share something!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
