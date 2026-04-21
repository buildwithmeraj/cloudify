import Docs from "@/components/pages/docs/Docs";
import React from "react";

export const metadata = {
  title: "API Docs | Cloudify",
  description: "API documentation for Cloudify auth, keys, and file endpoints.",
};

const page = () => {
  return (
    <div>
      <Docs />
    </div>
  );
};

export default page;
