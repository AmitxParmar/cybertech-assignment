import ClientUserProfile from "@/components/ClientUserProfile";

// Server Component
export default async function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  // Get userId from route params (Next.js 13+ server component)
  // @ts-ignore
  // Next.js passes params as a prop to the page component
  // See: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
  return <ClientUserProfile userId={userId} />;
}
