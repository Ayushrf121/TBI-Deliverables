"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui'; 

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initial sync with localStorage on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-6 flex justify-between items-center border-b border-gray-800">
      <div className="text-xl font-bold tracking-tight">DevApp</div>
      <div className="flex gap-4 text-sm md:text-base items-center">
        <Link href="/" className="hover:text-blue-400 transition">Home</Link>
        <Link href="/about" className="hover:text-blue-400 transition">About</Link>
        <Link href="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
        <Link href="/login" className="hover:text-blue-400 transition">Login</Link>
        
        {/* Simple UI Library Button implementation */}
        <Button 
          text={darkMode ? "☀️ Light" : "🌙 Dark"} 
          variant="secondary" 
          onClick={toggleTheme} 
        />
      </div>
    </nav>
  );
}