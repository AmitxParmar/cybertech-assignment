import ClientUserProfile from "@/components/ClientUserProfile";
import { notFound } from "next/navigation";

// Server Component
export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  // Validate userId parameter
  const { userId } = await params;

  // Check if userId is valid (not empty and is a string)
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    console.error("Invalid userId parameter:", userId);
    notFound();
  }

  console.log("userId profile test", userId);

  return <ClientUserProfile userId={userId} />;
}
