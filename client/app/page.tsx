"use client";
import { PostFeed } from "@/components/common/posts/post-feed";
import { Loader2 } from "lucide-react";
import { useAuthRedirect } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useAuthRedirect();

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated && !isLoading) {
      router.push("/login");
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
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
