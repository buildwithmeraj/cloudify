import AllKeys from "@/components/pages/dashboard/AllKeys";
import React from "react";

export const metadata = {
  title: "Keys | Cloudify",
  description: "Manage Cloudinary and public API keys for your Cloudify workflows.",
};

const page = () => {
  return (
    <div>
      <AllKeys />
    </div>
  );
};

export default page;
