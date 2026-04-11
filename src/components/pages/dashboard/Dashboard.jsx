"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout} className="mt-12 btn">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
