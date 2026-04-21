"use client";

import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filesError, setFilesError] = useState("");
  const [cloudinaryKeys, setCloudinaryKeys] = useState([]);
  const [publicKeys, setPublicKeys] = useState([]);
  const [files, setFiles] = useState([]);
  const [activeBucket, setActiveBucket] = useState("");

  const maskKey = (key) => {
    if (!key) return "-";
    if (key.length <= 10) return key;
    return `${key.slice(0, 6)}••••••${key.slice(-4)}`;
  };

  const formatBytes = (bytes) => {
    if (typeof bytes !== "number" || Number.isNaN(bytes)) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    setFilesError("");

    try {
      const [cloudRes, publicRes] = await Promise.all([
        api.get("/api/keys/cloudinary"),
        api.get("/api/keys/public"),
      ]);

      const cloudItems = Array.isArray(cloudRes.data) ? cloudRes.data : [];
      const publicItems = Array.isArray(publicRes.data) ? publicRes.data : [];

      setCloudinaryKeys(cloudItems);
      setPublicKeys(publicItems);

      const firstPublic = publicItems[0];
      if (!firstPublic?.key || !firstPublic?.name) {
        setFiles([]);
        setActiveBucket("");
        return;
      }

      setActiveBucket(firstPublic.name);

      try {
        const filesRes = await api.get("/api/cloudinary/files", {
          headers: {
            Authorization: `Bearer ${firstPublic.key}`,
          },
          params: {
            name: firstPublic.name,
          },
        });

        const items = Array.isArray(filesRes.data?.files)
          ? filesRes.data.files
          : [];
        setFiles(items);
      } catch (err) {
        setFiles([]);
        setFilesError(
          err.response?.data?.message ||
            "Could not load file stats for the selected public key.",
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const recentFiles = useMemo(() => files.slice(0, 5), [files]);

  return (
    <div className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 space-y-6">
      <section className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-black leading-tight text-base-content sm:text-4xl">
              Welcome back{user?.name ? `, ${user.name}` : ""}.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-base-content/70 sm:text-base">
              Manage API keys, monitor file activity, and jump into Cloudinary
              workflows from one dashboard.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline"
            onClick={loadDashboard}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Refreshing
              </>
            ) : (
              "Refresh Data"
            )}
          </button>
        </div>
      </section>

      {error && (
        <div className="alert alert-error text-sm py-2">
          <span>{error}</span>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-base-content/60">
            Cloudinary Accounts
          </p>
          <p className="mt-2 text-3xl font-black text-base-content">
            {loading ? "--" : cloudinaryKeys.length}
          </p>
        </article>
        <article className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-base-content/60">
            Public Keys
          </p>
          <p className="mt-2 text-3xl font-black text-base-content">
            {loading ? "--" : publicKeys.length}
          </p>
        </article>
        <article className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-base-content/60">
            Files in Bucket
          </p>
          <p className="mt-2 text-3xl font-black text-base-content">
            {loading ? "--" : files.length}
          </p>
          <p className="mt-1 text-xs text-base-content/60">
            {activeBucket ? `Bucket: ${activeBucket}` : "No active bucket"}
          </p>
        </article>
        <article className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-base-content/60">
            Account Email
          </p>
          <p className="mt-2 text-sm font-semibold break-all text-base-content">
            {user?.email || "-"}
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-base-content">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard/files/cloudinary" className="btn btn-primary">
            Open File Manager
          </Link>
          <Link href="/dashboard/keys/cloudinary" className="btn btn-outline">
            Manage Cloudinary Keys
          </Link>
          <Link href="/dashboard/keys/public" className="btn btn-outline">
            Manage Public Keys
          </Link>
          <Link href="/docs" className="btn btn-ghost">
            API Docs
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-base-content">Public Keys</h3>
          <p className="mt-1 text-sm text-base-content/70">
            First key is used for file listing and deletion APIs.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Key</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  publicKeys.slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td className="font-medium">{item.name}</td>
                      <td className="font-mono text-xs">{maskKey(item.key)}</td>
                    </tr>
                  ))}
                {!loading && publicKeys.length === 0 && (
                  <tr>
                    <td colSpan={2} className="text-sm text-base-content/50">
                      No public keys added yet.
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan={2} className="py-5 text-center">
                      <span className="loading loading-spinner loading-sm text-primary" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-base-content">Recent Files</h3>
          <p className="mt-1 text-sm text-base-content/70">
            Showing latest 5 files from current bucket.
          </p>
          {filesError && (
            <div className="alert alert-warning mt-4 text-sm py-2">
              <span>{filesError}</span>
            </div>
          )}
          <div className="mt-4 space-y-2">
            {!loading &&
              recentFiles.map((file) => (
                <div
                  key={file.id}
                  className="rounded-xl border border-base-300 bg-base-100 px-3 py-2"
                >
                  <p className="text-sm font-semibold text-base-content break-all">
                    {file.public_id || file.name || `File #${file.id}`}
                  </p>
                  <p className="text-xs text-base-content/60">
                    {file.resource_type || "unknown"} • {formatBytes(file.bytes)}
                  </p>
                </div>
              ))}
            {!loading && recentFiles.length === 0 && (
              <p className="text-sm text-base-content/50">
                No files found for the selected bucket.
              </p>
            )}
            {loading && (
              <div className="py-5 text-center">
                <span className="loading loading-spinner loading-sm text-primary" />
              </div>
            )}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
