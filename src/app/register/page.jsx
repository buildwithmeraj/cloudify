import RegisterPage from "@/components/pages/auth/Register";
import React from "react";

export const metadata = {
  title: "Register | Cloudify",
  description: "Create your Cloudify account to manage media providers and file operations.",
};

const page = () => {
  return <RegisterPage />;
};

export default page;
