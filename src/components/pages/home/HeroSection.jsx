"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FiBookOpen, FiFolder, FiGrid, FiKey, FiLogIn, FiUserPlus } from "react-icons/fi";

const HeroSection = () => {
  const { user, loading } = useAuth();
  const isAuthenticated = Boolean(user);

  return (
    <section className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-8 lg:p-10">
      <div>
        <h1 className="text-2xl font-black leading-tight text-base-content sm:text-4xl lg:text-5xl">
          One dashboard to manage media providers, starting with Cloudinary.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-base-content/70 sm:mt-5 sm:text-base lg:text-lg">
          Cloudify is designed as a multi-provider media control panel. Today it
          supports Cloudinary workflows end-to-end, with additional providers
          planned.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
          {!loading && isAuthenticated ? (
            <>
              <Link href="/dashboard" className="btn btn-primary w-full sm:w-auto">
                <FiGrid size={15} />
                Open Dashboard
              </Link>
              <Link
                href="/dashboard/files/cloudinary"
                className="btn btn-outline w-full sm:w-auto"
              >
                <FiFolder size={15} />
                Open File Manager
              </Link>
              <Link href="/dashboard/keys" className="btn btn-outline w-full sm:w-auto">
                <FiKey size={15} />
                Manage Keys
              </Link>
            </>
          ) : (
            <>
              <Link href="/register" className="btn btn-primary w-full sm:w-auto">
                <FiUserPlus size={15} />
                Get Started Free
              </Link>
              <Link href="/login" className="btn btn-outline w-full sm:w-auto">
                <FiLogIn size={15} />
                Login
              </Link>
            </>
          )}
          <Link href="/docs" className="btn btn-ghost w-full sm:w-auto">
            <FiBookOpen size={15} />
            Read API Docs
          </Link>
        </div>

        <div className="mt-6 grid gap-2 text-sm text-base-content/70 sm:flex sm:flex-wrap sm:gap-5">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success" />
            API key vault support
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-info" />
            Cloudinary support available now
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-warning" />
            More providers coming soon
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
