"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    // Auto sign-in after registration
    await signIn("credentials", { email, password, callbackUrl: "/profile" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[24px] shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center mb-6">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-brand-text">Create your account</h2>
          <p className="mt-2 text-sm text-brand-muted">Start your coaching journey today.</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>
          )}
          <div>
            <label className="block text-sm font-semibold text-brand-text mb-1">Full Name</label>
            <input
              type="text" required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
              placeholder="John Doe"
              value={name} onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-text mb-1">Email address</label>
            <input
              type="email" required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
              placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-text mb-1">Password</label>
            <input
              type="password" required minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
              placeholder="Min. 6 characters"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-brand-primary text-white py-4 rounded-xl text-sm font-bold hover:bg-brand-secondary transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or</span></div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/profile" })}
          className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-brand-muted mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-primary font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
