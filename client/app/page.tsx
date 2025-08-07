"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostFeed } from "@/components/common/posts/post-feed";

import { Loader2 } from "lucide-react";
import { useMe } from "@/hooks/useAuth";

export default function HomePage() {
  const me = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!me.isLoading && !me.data?.id) {
      router.push("/login");
    }
  }, [me.data?.id, me.isLoading, router]);

  if (me.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (me.error) {
    return null;
  }

  return (
    <div className="container max-w-2xl mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Home Feed</h1>
        <p className="text-muted-foreground">
          Stay connected with your network
        </p>
      </div>
      <PostFeed />
    </div>
  );
}
