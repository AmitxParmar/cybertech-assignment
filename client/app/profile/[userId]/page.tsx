import ClientUserProfile from "@/components/ClientUserProfile";

// Server Component
export default function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  // No need for URLSearchParams here; userId comes directly from params
  const { userId } = params;
  console.log("userId profile test", userId);
  return <ClientUserProfile userId={userId} />;
}
