"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  FiBookOpen,
  FiFolder,
  FiKey,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { BsMagic } from "react-icons/bs";

const QuickStartSection = () => {
  const { user, loading } = useAuth();
  const isAuthenticated = Boolean(user);

  return (
    <section className="mt-14">
      <article className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm relative">
        <h2 className="text-2xl font-extrabold text-base-content">
          2-Minute Quick Start
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-base-content/70 sm:text-base">
          This is the fastest path from zero setup to working file APIs. If you
          are onboarding a teammate, these are the same steps they should follow
          to avoid auth and key mismatch issues. Current provider support is
          Cloudinary.
        </p>
        <ol className="mt-4 space-y-3 text-sm text-base-content/70">
          <li>
            <span className="font-semibold text-base-content">1.</span> Register
            or login to your account.
          </li>
          <li>
            <span className="font-semibold text-base-content">2.</span> Add your
            Cloudinary credentials from the keys section.
          </li>
          <li>
            <span className="font-semibold text-base-content">3.</span> Go to
            the Cloudinary files page and upload your media.
          </li>
          <li>
            <span className="font-semibold text-base-content">4.</span> Copy and
            use generated links in your app or website.
          </li>
        </ol>

        <div className="mt-5 flex flex-wrap gap-3">
          {!loading && isAuthenticated ? (
            <>
              <Link href="/dashboard/keys" className="btn btn-neutral">
                <FiKey size={15} />
                Open Keys
              </Link>
              <Link
                href="/dashboard/files/cloudinary"
                className="btn btn-primary"
              >
                <FiFolder size={15} />
                Open Files
              </Link>
            </>
          ) : (
            <>
              <Link href="/register" className="btn btn-neutral">
                <FiUserPlus size={15} />
                Create Account
              </Link>
              <Link href="/login" className="btn btn-primary">
                <FiLogIn size={15} />
                Login
              </Link>
            </>
          )}
          <Link href="/docs" className="btn btn-info">
            <FiBookOpen size={15} />
            API Docs
          </Link>
        </div>
        <BsMagic
          size={120}
          className="hidden lg:block absolute top-[30%] right-4 opacity-40 text-primary"
        />
      </article>
    </section>
  );
};

export default QuickStartSection;
