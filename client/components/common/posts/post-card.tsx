"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Post } from "@/types/types";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  console.log("post", post);
  return (
    <Card className="rounded-none border-y-4 border-muted-foreground ">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Link href={`/profile/${post.author.id}`}>
            <Avatar className="h-10 w-10">
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
              className="font-semibold text-sm hover:underline"
            >
              {post.author.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 max-h-96 overflow-auto">
        <div
          className="text-sm rich-text-card !dark:text-white overflow-x-hidden overflow-y-auto leading-relaxed px-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </CardContent>
    </Card>
  );
}
