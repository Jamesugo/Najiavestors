"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, User, Building2, Lock, Mail, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [role, setRole] = useState<"USER" | "BUSINESS_OWNER" | "ADMIN">("USER");
  const [email, setEmail] = useState("patron@najiavestors.ng");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleRolePreset = (selectedRole: "USER" | "BUSINESS_OWNER" | "ADMIN") => {
    setRole(selectedRole);
    if (selectedRole === "ADMIN") {
      setEmail("admin@najiavestors.ng");
    } else if (selectedRole === "BUSINESS_OWNER") {
      setEmail("owner@terra.ng");
    } else {
      setEmail("patron@najiavestors.ng");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === "ADMIN") {
        router.push("/admin");
      } else if (role === "BUSINESS_OWNER") {
        router.push("/add-business");
      } else {
        router.push("/");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B6E4F] text-white">
            <span className="text-xl font-black">N</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Najia<span className="text-[#0B6E4F] dark:text-[#10B981]">vestors</span>
          </span>
        </Link>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Sign In to Your Account
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Access your business listings, saved bookmarks, and verified reviews
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          
          {/* Role Preset Selector */}
          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Demo Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRolePreset("USER")}
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                  role === "USER"
                    ? "bg-[#0B6E4F] text-white shadow-xs"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                Patron
              </button>

              <button
                type="button"
                onClick={() => handleRolePreset("BUSINESS_OWNER")}
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                  role === "BUSINESS_OWNER"
                    ? "bg-[#0B6E4F] text-white shadow-xs"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                Owner
              </button>

              <button
                type="button"
                onClick={() => handleRolePreset("ADMIN")}
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                  role === "ADMIN"
                    ? "bg-[#0B6E4F] text-white shadow-xs"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Social Google Login Button */}
          <button
            type="button"
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white transition-colors mb-4"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-4 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <span className="relative bg-white px-2 text-[10px] uppercase text-slate-400 dark:bg-slate-900">
              Or email login
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-press w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B6E4F] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#08563D] disabled:opacity-50 transition-colors mt-2"
            >
              <span>{loading ? "Authenticating..." : `Sign In as ${role.replace("_", " ")}`}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
