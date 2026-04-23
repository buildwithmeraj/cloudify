"use client";

import { useState } from "react";
import Link from "next/link";
import { SiCloudinary } from "react-icons/si";
import api from "@/lib/api";
import ErrorModal from "@/components/utilities/ErrorModal";
import SuccessModal from "@/components/utilities/SuccessModal";
import { FaPlus } from "react-icons/fa6";
import { FiGrid, FiKey } from "react-icons/fi";

const AddCloudinaryKey = () => {
  const [cloudName, setCloudName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await api.post("/api/keys/cloudinary", {
        name: cloudName,
        key: apiKey,
        secret: apiSecret,
      });
      setSuccess("Cloudinary account added successfully.");
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        const first = Object.values(errors)[0];
        setError(Array.isArray(first) ? first[0] : first);
      } else {
        setError(err.response?.data?.message || "Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80dvh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm p-6 space-y-5">
          <div className="text-center space-y-2">
            <div className="flex justify-center gap-2 mb-6">
              <SiCloudinary size={32} className="text-primary mt-0.5" />
              <h2 className="text-3xl font-bold text-base-content">
                Add Cloudinary API
              </h2>
            </div>
          </div>

          {error && <ErrorModal message={error} />}
          {success && (
            <SuccessModal
              message={success}
              link={["Cloudinary Keys", "/dashboard/keys/cloudinary"]}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <span className="label-text font-semibold inline-flex items-center gap-2 text-base-content">
                Cloud Name
              </span>
              <input
                type="text"
                placeholder="dwecoeqny"
                className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
                value={cloudName}
                onChange={(e) => setCloudName(e.target.value)}
                required
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="label-text font-semibold inline-flex items-center gap-2 text-base-content">
                API Key
              </span>
              <input
                type="text"
                placeholder="612951342803327"
                className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="label-text font-semibold inline-flex items-center gap-2 text-base-content">
                API Secret
              </span>
              <input
                type="text"
                placeholder="Dt5gMnasYB5HhGl1g9e2ENzKbNU"
                className="input input-bordered w-full text-sm focus:outline-none focus:border-primary"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                required
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <FaPlus />
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Adding...
                </>
              ) : (
                "Add"
              )}
            </button>
          </form>

          <div className="divider my-3 text-xs text-base-content/50">OR</div>

          <div className="text-center flex items-center gap-2">
            <Link href="/dashboard" className="btn btn-secondary">
              <FiGrid />
              Dashboard
            </Link>
            <Link
              href="/dashboard/keys/cloudinary"
              className="btn btn-secondary flex-1"
            >
              <FiKey />
              Cloudinary Keys
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCloudinaryKey;
