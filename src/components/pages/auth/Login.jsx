"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogIn, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FaSignInAlt, FaGoogle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

function ErrorMsg({ message }) {
  return (
    <div className="alert alert-error text-sm py-2">
      <span>{message}</span>
    </div>
  );
}

function InfoMsg({ message }) {
  return (
    <div className="alert alert-info text-sm py-2">
      <span>{message}</span>
    </div>
  );
}

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const emailError = emailTouched && !email ? "Email is required" : "";
  const passwordError =
    passwordTouched && password.length > 0 && password.length < 8
      ? "Password must be at least 8 characters"
      : "";

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      await login(res.data.token);
      router.replace("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/redirect`;
  };

  return (
    <div className="min-h-[80dvh] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm p-6 space-y-5">
          <div className="text-center space-y-2">
            <div className="flex justify-center gap-2 mb-6">
              <FiLogIn size={32} className="text-primary mt-0.5" />
              <h2 className="text-3xl font-bold text-base-content">Login</h2>
            </div>
          </div>

          {error && <ErrorMsg message={error} />}

          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <span className="label-text font-semibold inline-flex items-center gap-2 text-base-content">
                <FiMail size={16} className="text-primary" />
                Email Address
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                className={`input input-bordered w-full text-sm focus:outline-none focus:border-primary ${emailError ? "input-error border-error" : ""}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailTouched(true);
                }}
                required
                autoComplete="email"
              />
              {emailError && (
                <span className="text-error text-xs mt-1">{emailError}</span>
              )}
            </div>

            <div>
              <div className="form-control w-full relative">
                <label className="label pb-2">
                  <span className="label-text font-semibold inline-flex items-center gap-2 text-base-content">
                    <FiLock size={16} className="text-primary" />
                    Password
                  </span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`input input-bordered w-full text-sm focus:outline-none focus:border-primary ${passwordError ? "input-error border-error" : ""}`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordTouched(true);
                  }}
                  required
                  minLength={8}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-[56%] text-base-content/60 hover:text-primary cursor-pointer"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {passwordError && (
                <span className="text-error text-xs mt-1">{passwordError}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                isLoading || isGoogleLoading || !!emailError || !!passwordError
              }
            >
              <FaSignInAlt />
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="divider my-3 text-xs text-base-content/50">OR</div>

          <button
            type="button"
            className="btn btn-outline w-full text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading}
          >
            <FaGoogle size={18} className="mb-0.5" />
            {isGoogleLoading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Redirecting...
              </>
            ) : (
              "Continue with Google"
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-base-content/70">
              Don&#39;t have an account?{" "}
              <Link
                href="/register"
                className="link link-primary font-semibold"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
