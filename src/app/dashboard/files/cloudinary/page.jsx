import FilesList from "@/components/pages/cloudinary/FilesList";
import React from "react";

export const metadata = {
  title: "Cloudinary Files | Cloudify",
  description: "Browse, preview, and delete Cloudinary files from your Cloudify dashboard.",
};

const page = () => {
  return (
    <div>
      <FilesList />
    </div>
  );
};

export default page;
