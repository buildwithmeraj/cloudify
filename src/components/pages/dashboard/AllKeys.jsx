"use client";

import api from "@/lib/api";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { FiKey, FiPlus, FiRefreshCw, FiShield } from "react-icons/fi";

function maskKey(key) {
  if (!key) return "-";
  if (key.length <= 10) return key;
  return `${key.slice(0, 6)}••••••${key.slice(-4)}`;
}

const AllKeys = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cloudinaryKeys, setCloudinaryKeys] = useState([]);
  const [publicKeys, setPublicKeys] = useState([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [cloudRes, publicRes] = await Promise.all([
        api.get("/api/keys/cloudinary"),
        api.get("/api/keys/public"),
      ]);
      setCloudinaryKeys(Array.isArray(cloudRes.data) ? cloudRes.data : []);
      setPublicKeys(Array.isArray(publicRes.data) ? publicRes.data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load key data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="w-full px-4 pt-2 pb-8 sm:px-6 sm:pt-3 sm:pb-10 lg:px-8 lg:pt-4 lg:pb-12 space-y-6">
      <section className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-black leading-tight text-base-content sm:text-4xl">
              Key Management
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-base-content/70 sm:text-base">
              Manage Cloudinary credentials and public API keys used by upload,
              list, and delete file endpoints.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline"
            onClick={loadData}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Refreshing
              </>
            ) : (
              <>
                <FiRefreshCw size={15} />
                Refresh Data
              </>
            )}
          </button>
        </div>
      </section>

      {error && (
        <div className="alert alert-error text-sm py-2">
          <span>{error}</span>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-base-content/60">
            Cloudinary Accounts
          </p>
          <p className="mt-2 text-3xl font-black text-base-content">
            {loading ? "--" : cloudinaryKeys.length}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/dashboard/keys/cloudinary"
              className="btn btn-sm btn-primary"
            >
              <FiKey size={14} />
              Manage
            </Link>
            <Link
              href="/dashboard/keys/cloudinary/add"
              className="btn btn-sm btn-outline"
            >
              <FiPlus size={14} />
              Add New
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-base-content/60">
            Public Keys
          </p>
          <p className="mt-2 text-3xl font-black text-base-content">
            {loading ? "--" : publicKeys.length}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/dashboard/keys/public"
              className="btn btn-sm btn-primary"
            >
              <FiShield size={14} />
              Manage
            </Link>
            <Link
              href="/dashboard/keys/public/add"
              className="btn btn-sm btn-outline"
            >
              <FiPlus size={14} />
              Add New
            </Link>
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-base-content">
            Cloudinary Preview
          </h2>
          <p className="mt-1 text-sm text-base-content/70">
            First few configured Cloudinary accounts.
          </p>

          <div className="mt-4 space-y-2">
            {!loading &&
              cloudinaryKeys.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-base-300 bg-base-100 px-3 py-2"
                >
                  <p className="text-sm font-semibold text-base-content">
                    {item.name}
                  </p>
                  <p className="text-xs font-mono text-base-content/60">
                    {maskKey(item.key)}
                  </p>
                </div>
              ))}

            {!loading && cloudinaryKeys.length === 0 && (
              <p className="text-sm text-base-content/50">
                No Cloudinary accounts yet.
              </p>
            )}

            {loading && (
              <div className="py-5 text-center">
                <span className="loading loading-spinner loading-sm text-primary" />
              </div>
            )}
          </div>
        </article>

        <article className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-base-content">
            Public Key Preview
          </h2>
          <p className="mt-1 text-sm text-base-content/70">
            First few keys used for file APIs.
          </p>

          <div className="mt-4 space-y-2">
            {!loading &&
              publicKeys.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-base-300 bg-base-100 px-3 py-2"
                >
                  <p className="text-sm font-semibold text-base-content">
                    {item.name}
                  </p>
                  <p className="text-xs font-mono text-base-content/60">
                    {maskKey(item.key)}
                  </p>
                </div>
              ))}

            {!loading && publicKeys.length === 0 && (
              <p className="text-sm text-base-content/50">
                No public keys yet.
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

export default AllKeys;
