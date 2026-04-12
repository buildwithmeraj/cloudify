"use client";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const { logout } = useAuth();
  const [cloudinaryKeys, setCloudinaryKeys] = useState(null);
  const getCloudinaryKeys = async () => {
    const res = await api.get("/api/keys/cloudinary");
    setCloudinaryKeys(res.data);
  };
  const getPublicKeys = async () => {
    const res = await api.get("/api/keys/public");
    setCloudinaryKeys(res.data);
  };
  useEffect(() => {
    setTimeout(() => {
      getPublicKeys();
      getCloudinaryKeys();
    }, 0);
  }, []);

  return (
    <div>
      {cloudinaryKeys &&
        cloudinaryKeys.map((cloudinaryKey) => {
          return <p key={cloudinaryKey.key}>{cloudinaryKey.key}</p>;
        })}
      <Link href="/dashboard/add-cloudinary-key" className="btn btn-primary">
        Add Cloudinary
      </Link>
      <Link href="/dashboard/add-public-key" className="btn btn-primary">
        Add Public
      </Link>
      <button onClick={logout} className="mt-12 btn">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
