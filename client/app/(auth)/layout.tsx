"use client";
import { useAuthRedirect } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthRedirect();
  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated && !isLoading) {
      router.push("/");
    }
  }, []);

  return <div className="h-screen w-screen flex mx-auto">{children}</div>;
};

export default AuthLayout;
