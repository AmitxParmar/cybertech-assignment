import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The user profile you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
