import Dashboard from "@/components/pages/dashboard/Dashboard";
import React from "react";

export const metadata = {
  title: "Dashboard | Cloudify",
  description: "Overview of your keys, file activity, and quick actions in Cloudify.",
};

const page = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default page;
