"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Post } from "@/types/types";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, ThumbsUp, Share2 } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // Remove console.log in production for cleaner UI
  // console.log("post", post);

  return (
    <Card className="rounded-lg border border-muted-foreground shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2 border-b border-muted-foreground/20 rounded-t-lg bg-gradient-to-br from-background via-muted/60 to-background px-6 py-4">
        <div className="flex items-center space-x-4">
          <Link href={`/profile/${post.author.id}`}>
            <Avatar className="h-12 w-12 ring-2 ring-primary ring-offset-2 ring-offset-background transition-transform hover:scale-105">
              <AvatarImage alt={post.author.name} />
              <AvatarFallback>
                {post?.author?.name
                  ? post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "?"}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 min-w-0">
            <Link
              href={`/profile/${post.author.id}`}
              className="font-semibold text-base hover:underline text-primary transition-colors"
            >
              {post.author.name}
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/60 mr-1" />
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-2 max-h-96 overflow-auto dark:bg-black">
        <div
          className="text-base rich-text-card !dark:text-white overflow-x-hidden overflow-y-auto leading-relaxed px-2 sm:px-6 py-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="flex items-center justify-between mt-4 px-2 sm:px-6">
          <button
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs font-medium px-2 py-1 rounded hover:bg-primary/10"
            title="Like"
            type="button"
          >
            <ThumbsUp size={16} className="mr-1" />
            Like
          </button>
          <button
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs font-medium px-2 py-1 rounded hover:bg-primary/10"
            title="Comment"
            type="button"
          >
            <MessageCircle size={16} className="mr-1" />
            Comment
          </button>
          <button
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors text-xs font-medium px-2 py-1 rounded hover:bg-primary/10"
            title="Share"
            type="button"
          >
            <Share2 size={16} className="mr-1" />
            Share
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
