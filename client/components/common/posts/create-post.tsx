"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMe } from "@/hooks/useAuth";
import { useCreatePost } from "@/hooks/usePosts";
import { Loader2 } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

export function CreatePost() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data } = useMe();
  console.log(data);
  const { mutate: createPost } = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    createPost(content?.trim(), {
      onError: (err) => console.log(err),
      onSuccess: () => setContent(""),
    });
    setIsSubmitting(false);
  };

  if (!data?.id) return null;

  return (
    <Card className="rounded-none shadow-none border-y-8 border-black">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Create a post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage alt={data?.name} />
              <AvatarFallback>
                {data?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <RichTextEditor
                placeholder="What's on your mind?"
                value={content}
                onChange={setContent}
                className="min-h-[100px] resize-none border-0 p-0 focus-visible:ring-0 text-base"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">
                  {content.length}/500
                </span>
                <Button
                  type="submit"
                  disabled={!content.trim() || isSubmitting}
                  size="sm"
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Post
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
