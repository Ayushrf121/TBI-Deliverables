import React from 'react'

export default function page() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <h1 className="text-3xl font-extrabold mb-3">About</h1>
      <p className="text-slate-600 dark:text-slate-400 max-w-md">
        This is the About page for TBI SIP-2026 — a program to help students become fully AI-assisted programmers.
      </p>
    </div>
  )
}