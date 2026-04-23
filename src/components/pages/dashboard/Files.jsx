"use client";

import api from "@/lib/api";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FiRefreshCw, FiSettings } from "react-icons/fi";
import { SiCloudflare, SiCloudinary } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import Loader from "@/components/utilities/Loader";
import ErrorModal from "@/components/utilities/ErrorModal";

const providers = [
  {
    id: "cloudinary",
    name: "Cloudinary",
    description:
      "Upload, list, preview, and delete media from your Cloudinary buckets.",
    href: "/dashboard/files/cloudinary",
    status: "live",
    icon: SiCloudinary,
  },
  {
    id: "r2",
    name: "Cloudflare R2",
    description:
      "S3-compatible object storage with no egress fees. Great fit for larger file workloads.",
    href: "#",
    status: "soon",
    icon: SiCloudflare,
  },
  {
    id: "s3",
    name: "Amazon S3",
    description:
      "Standard cloud object storage integration for broad ecosystem compatibility.",
    href: "#",
    status: "soon",
    icon: FaAws,
  },
];

const Files = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cloudinaryKeysCount, setCloudinaryKeysCount] = useState(0);
  const [publicKeysCount, setPublicKeysCount] = useState(0);

  const loadStatus = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [cloudRes, publicRes] = await Promise.all([
        api.get("/api/keys/cloudinary"),
        api.get("/api/keys/public"),
      ]);
      setCloudinaryKeysCount(
        Array.isArray(cloudRes.data) ? cloudRes.data.length : 0,
      );
      setPublicKeysCount(
        Array.isArray(publicRes.data) ? publicRes.data.length : 0,
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not load provider status.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const cloudinaryReady = cloudinaryKeysCount > 0 && publicKeysCount > 0;

  if (loading) return <Loader />;

  return (
    <div className="w-full px-4 pt-2 pb-8 sm:px-6 sm:pt-3 sm:pb-10 lg:px-8 lg:pt-4 lg:pb-12 space-y-6">
      <section className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-black leading-tight text-base-content sm:text-4xl">
              File Providers
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-base-content/70 sm:text-base">
              Manage media across multiple providers from one place. Cloudinary
              is live today, and Cloudflare R2 is planned next.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-outline"
            onClick={loadStatus}
            disabled={loading}
          >
            <FiRefreshCw size={15} />
            Refresh Status
          </button>
        </div>
      </section>

      {error && <ErrorModal message={error} />}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {providers.map((provider) => {
          const Icon = provider.icon;
          const isLive = provider.status === "live";
          return (
            <article
              key={provider.id}
              className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-base-200 text-base-content">
                  <Icon size={18} />
                </span>
                <span
                  className={`badge ${isLive ? "badge-success" : "badge-ghost"}`}
                >
                  {isLive ? "Live" : "Coming Soon"}
                </span>
              </div>

              <h2 className="mt-4 text-lg font-bold text-base-content">
                {provider.name}
              </h2>
              <p className="mt-2 text-sm text-base-content/70">
                {provider.description}
              </p>

              {provider.id === "cloudinary" && (
                <div className="mt-4 rounded-xl border border-base-300 bg-base-100 px-3 py-2 text-sm">
                  <p className="text-base-content/70">
                    Cloudinary Keys:{" "}
                    <span className="font-semibold text-base-content">
                      {loading ? "--" : cloudinaryKeysCount}
                    </span>
                  </p>
                  <p className="text-base-content/70">
                    Public Keys:{" "}
                    <span className="font-semibold text-base-content">
                      {loading ? "--" : publicKeysCount}
                    </span>
                  </p>
                </div>
              )}

              <div className="mt-5">
                {isLive ? (
                  <Link
                    href={provider.href}
                    className={`btn btn-sm ${cloudinaryReady ? "btn-primary" : "btn-outline"}`}
                  >
                    <FiSettings size={14} />
                    {cloudinaryReady ? "Open Manager" : "Setup Required"}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    disabled
                  >
                    Planned
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Files;
