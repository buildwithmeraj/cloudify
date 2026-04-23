"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiUserPlus,
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import ErrorMsg from "@/components/utilities/Error";
import SuccessModal from "@/components/utilities/SuccessModal";

export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const redirectTimeoutRef = useRef(null);

  const nameError = nameTouched && !name ? "Name is required" : "";
  const emailError = emailTouched && !email ? "Email is required" : "";
  const passwordError =
    passwordTouched && password.length > 0 && password.length < 8
      ? "Password must be at least 8 characters"
      : "";
  const confirmError =
    confirmTouched && confirmPassword !== password
      ? "Passwords do not match"
      : "";

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await api.post("/api/auth/register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });
      await login(res.data.token);
      setSuccessMessage(
        "Account created successfully. Redirecting to dashboard...",
      );
      redirectTimeoutRef.current = setTimeout(() => {
        router.replace("/dashboard");
      }, 3000);
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        const first = Object.values(errors)[0];
        setError(Array.isArray(first) ? first[0] : first);
      } else {
        setError(err.response?.data?.message || "Registration failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setIsGoogleLoading(true);
    const apiUrl = (
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
    ).replace(/\/+$/, "");
    window.location.href = `${apiUrl}/auth/google/redirect`;
  };

  return (
    <div className="min-h-[85dvh] flex items-center justify-center p-4">
      <div className="min-w-sm max-w-md space-y-4">
        {successMessage && (
          <SuccessModal
            title="Registration Successful"
            message={successMessage}
            link={["Dashboard", "/dashboard"]}
          />
        )}
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm p-6 space-y-5">
          <div className="text-center space-y-2">
            <div className="flex justify-center gap-2 mb-6">
              <FiUserPlus size={32} className="text-primary mt-0.5" />
              <h2 className="text-3xl font-bold text-base-content">
                Create Account
              </h2>
            </div>
          </div>

          {error && <ErrorMsg message={error} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <span className="label-text font-semibold inline-flex items-center gap-2 text-base-content">
                <FiUser size={16} className="text-primary" />
                Name
              </span>
              <input
                type="text"
                placeholder="Your name"
                className={`input input-bordered w-full text-sm focus:outline-none focus:border-primary ${nameError ? "input-error border-error" : ""}`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameTouched(true);
                }}
                required
                autoComplete="name"
              />
              {nameError && (
                <span className="text-error text-xs mt-1">{nameError}</span>
              )}
            </div>

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
              <div className="flex flex-col gap-1.5 relative">
                <span className="label-text font-semibold inline-flex items-center gap-2 text-base-content">
                  <FiLock size={16} className="text-primary" />
                  Password
                </span>
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
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-[55%] text-base-content/60 hover:text-primary cursor-pointer"
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

            <div>
              <div className="flex flex-col gap-1.5 relative">
                <span className="label-text font-semibold inline-flex items-center gap-2 text-base-content">
                  <FiLock size={16} className="text-primary" />
                  Confirm Password
                </span>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  className={`input input-bordered w-full text-sm focus:outline-none focus:border-primary ${confirmError ? "input-error border-error" : ""}`}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmTouched(true);
                  }}
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-[55%] text-base-content/60 hover:text-primary cursor-pointer"
                  tabIndex={-1}
                  onClick={() => setShowConfirm((v) => !v)}
                >
                  {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {confirmError && (
                <span className="text-error text-xs mt-1">{confirmError}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                isLoading ||
                isGoogleLoading ||
                !!successMessage ||
                !!nameError ||
                !!emailError ||
                !!passwordError ||
                !!confirmError
              }
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="divider my-3 text-xs text-base-content/50">OR</div>

          <button
            type="button"
            className="btn btn-outline w-full text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGoogleSignup}
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
              Already have an account?{" "}
              <Link href="/login" className="link link-primary font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
