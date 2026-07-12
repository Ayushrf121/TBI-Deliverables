"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Auth
    checkAuth();

    // Listen for localStorage changes (logout/login in another tab)
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-6 flex justify-between items-center border-b border-gray-800">
      <div className="text-xl font-bold tracking-tight">
        <Link href="/" className="hover:text-blue-400 transition">
          DevApp
        </Link>
      </div>

      <div className="flex gap-5 items-center text-sm md:text-base">
        <Link href="/hub" className="hover:text-blue-400 transition">
          Hub
        </Link>

        <Link href="/about" className="hover:text-blue-400 transition">
          About
        </Link>

        <Link href="/dashboard" className="hover:text-blue-400 transition">
          Dashboard
        </Link>

        {!isLoggedIn ? (
          <Link href="/login" className="hover:text-blue-400 transition">
            Login
          </Link>
        ) : (
          <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <span className="text-xl">👤</span>
            <span>Profile</span>
          </Link>
        )}

        <Button
          text={darkMode ? "☀️ Light" : "🌙 Dark"}
          variant="secondary"
          onClick={toggleTheme}
        />
      </div>
    </nav>
  );
}