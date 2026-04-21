import CloudinaryKeys from "@/components/pages/dashboard/CloudinaryKeys";
import React from "react";

export const metadata = {
  title: "Cloudinary Keys | Cloudify",
  description: "Manage Cloudinary account credentials used by Cloudify file operations.",
};

const page = () => {
  return (
    <div>
      <CloudinaryKeys />
    </div>
  );
};

export default page;
