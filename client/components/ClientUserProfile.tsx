// Client Component
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PostCard } from "@/components/common/posts/post-card";
import { Calendar, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/useUser";
import { Loader2 } from "lucide-react";
import { useMe } from "@/hooks/useAuth";

export default function ClientUserProfile({ userId }: { userId: string }) {
  const me = useMe();
  const { data: profileUser, isLoading } = useUserProfile(userId);

  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsOwnProfile(me.data?.id === userId);
    }
  }, [userId, me.data?.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profileUser?.user) {
    return (
      <div className="container max-w-2xl mx-auto py-6 px-4">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-2">User not found</h1>
          <p className="text-muted-foreground">
            The user you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-6 px-4">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage alt={profileUser.user?.name} />
              <AvatarFallback className="text-lg">
                {profileUser?.user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{profileUser.user?.name}</h1>
                {isOwnProfile && (
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground">{profileUser.user.email}</p>
              <div className="flex items-center text-sm text-muted-foreground mt-2">
                <Calendar className="h-4 w-4 mr-1" />
                Joined{" "}
                {formatDistanceToNow(new Date(profileUser.user?.createdAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>
        </CardHeader>
        {profileUser.user?.bio && (
          <CardContent className="pt-0">
            <p className="text-sm leading-relaxed">{profileUser.user?.bio}</p>
          </CardContent>
        )}
      </Card>

      {/* Posts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {isOwnProfile
              ? "Your Posts"
              : `${profileUser.user.name.split(" ")[0]}'s Posts`}
          </h2>
          <span className="text-sm text-muted-foreground">
            {profileUser.posts?.length}{" "}
            {profileUser.posts?.length === 1 ? "post" : "posts"}
          </span>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : profileUser.posts?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>
              {isOwnProfile
                ? "You haven't posted anything yet."
                : `${
                    profileUser.user.name.split(" ")[0]
                  } hasn't posted anything yet.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {profileUser?.posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
