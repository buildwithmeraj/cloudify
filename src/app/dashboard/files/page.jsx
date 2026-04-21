import Files from "@/components/pages/dashboard/Files";
import React from "react";

export const metadata = {
  title: "File Providers | Cloudify",
  description: "Manage file providers in Cloudify. Cloudinary is supported now; more providers are coming.",
};

const page = () => {
  return (
    <div>
      <Files />
    </div>
  );
};

export default page;
