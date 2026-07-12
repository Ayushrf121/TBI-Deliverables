"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Loader } from '@/components/ui';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      // Decode the JWT Payload client-side safely to read profile variables
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      
      setUser({
        id: decodedPayload.id,
        email: decodedPayload.email,
        name: decodedPayload.name || "Developer User",
        provider: decodedPayload.provider || "Local Cluster Account"
      });
    } catch (error) {
      console.error("Invalid token structure:", error);
      localStorage.removeItem('token');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100">
        <Loader size="medium" />
        <p className="text-xs text-slate-500 font-mono mt-3 uppercase tracking-widest">Resolving Session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-8 antialiased selection:bg-blue-500/30">
      {/* Structural Tech Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] bg-gradient-to-b from-emerald-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 border-b border-slate-800/80 pb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center font-bold text-xl text-white shadow-md">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-extrabold tracking-tight text-white">{user?.name}</h1>
            <p className="text-xs text-slate-400 font-mono bg-slate-950/80 border border-slate-850 px-2 py-0.5 rounded inline-block">
              ID: {user?.id}
            </p>
          </div>
        </div>

        {/* Identity Context Data Node */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Specifications</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3.5 bg-slate-950/60 border border-slate-850 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Email Address</span>
              <span className="text-sm font-semibold text-slate-200">{user?.email}</span>
            </div>

            <div className="flex justify-between items-center p-3.5 bg-slate-950/60 border border-slate-850 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Authentication Authority</span>
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 tracking-wider">
                {user?.provider}
              </span>
            </div>
          </div>
        </div>

        {/* Access Termination System */}
        <div className="pt-4 border-t border-slate-800/80 flex justify-end">
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 bg-red-950/40 border border-red-900/60 hover:bg-red-900/40 active:bg-red-950 text-red-200 font-semibold text-sm rounded-xl transition-all shadow-md"
          >
            Terminate Session (Logout)
          </button>
        </div>

      </div>
    </div>
  );
}