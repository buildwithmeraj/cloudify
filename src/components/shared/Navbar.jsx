"use client";

import React, { useState } from "react";
import Logo from "../utilities/Logo";
import ThemeSwitcher from "../utilities/ThemeSwitcher";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaPowerOff } from "react-icons/fa6";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuthenticated = Boolean(user);

  const guestItems = [
    { href: "/", label: "Home" },
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
  ];

  const authItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/files/cloudinary", label: "Cloudinary Files" },
    { href: "/dashboard/keys", label: "Keys" },
  ];

  const navItems = isAuthenticated ? authItems : guestItems;
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = async () => {
    closeSidebar();
    await logout();
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <button
            type="button"
            className="btn btn-ghost lg:hidden"
            aria-label="Open menu"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </button>
          <Link className="" href="/">
            <Logo />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {!loading &&
              navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="navbar-end gap-4">
          {!loading && isAuthenticated && (
            <div className="tooltip tooltip-bottom" data-tip="Logout">
              <button
                type="button"
                onClick={logout}
                className="btn btn-sm btn-error btn-soft hover:text-white btn-circle"
              >
                <FaPowerOff />
              </button>
            </div>
          )}
          <ThemeSwitcher />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${isSidebarOpen ? "visible" : "invisible pointer-events-none"}`}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 transition-opacity ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu overlay"
          onClick={closeSidebar}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-base-100 p-4 shadow-xl transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-4 flex items-center justify-between">
            <Link href="/" onClick={closeSidebar}>
              <Logo />
            </Link>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              aria-label="Close menu"
              onClick={closeSidebar}
            >
              ✕
            </button>
          </div>

          <ul className="menu w-full gap-1">
            {!loading &&
              navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeSidebar}>
                    {item.label}
                  </Link>
                </li>
              ))}
            {!loading && isAuthenticated && (
              <li>
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
