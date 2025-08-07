import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="h-screen w-screen flex mx-auto">{children}</div>;
};

export default AuthLayout;
