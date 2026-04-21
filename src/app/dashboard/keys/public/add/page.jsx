import AddPublicKey from "@/components/pages/dashboard/AddPublicKey";
import React from "react";

export const metadata = {
  title: "Add Public Key | Cloudify",
  description: "Create a new public API key for Cloudify file APIs.",
};

const page = () => {
  return (
    <div>
      <AddPublicKey />
    </div>
  );
};

export default page;
