import LoginPage from "@/components/pages/auth/Login";
import React from "react";

export const metadata = {
  title: "Login | Cloudify",
  description: "Sign in to access your Cloudify dashboard and media workflows.",
};

const page = () => {
  return <LoginPage />;
};

export default page;
