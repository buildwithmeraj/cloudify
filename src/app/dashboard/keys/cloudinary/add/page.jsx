import AddCloudinaryKey from "@/components/pages/dashboard/AddCloudinaryKey";
import React from "react";

export const metadata = {
  title: "Add Cloudinary Key | Cloudify",
  description: "Add a new Cloudinary account key pair to Cloudify.",
};

const page = () => {
  return (
    <div>
      <AddCloudinaryKey />
    </div>
  );
};

export default page;
