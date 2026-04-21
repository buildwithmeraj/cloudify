import PublicKeys from "@/components/pages/dashboard/PublicKeys";
import React from "react";

export const metadata = {
  title: "Public Keys | Cloudify",
  description: "Manage public API keys used for file upload and file operations.",
};

const page = () => {
  return (
    <div>
      <PublicKeys />
    </div>
  );
};

export default page;
