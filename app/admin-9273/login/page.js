"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Compass, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed.");
      router.push("/admin-9273");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-800 px-5">
      <div className="w-full max-w-sm rounded-xl border border-ink-700 bg-ink-900 p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marigold text-ink-800">
            <Compass size={20} strokeWidth={2.25} />
          </span>
          <h1 className="font-serif text-xl font-semibold text-white">ExamNiti Admin</h1>
          <p className="text-xs text-ink-300">Sign in to manage exam listings.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-medium text-ink-200">
            Username
            <input
              type="text"
              required
              autoFocus
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="mt-1.5 w-full rounded-md border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-white outline-none focus:border-marigold"
            />
          </label>
          <label className="block text-xs font-medium text-ink-200">
            Password
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1.5 w-full rounded-md border border-ink-600 bg-ink-800 px-3 py-2.5 text-sm text-white outline-none focus:border-marigold"
            />
          </label>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-marigold py-2.5 text-sm font-medium text-ink-800 transition-colors hover:bg-marigold-light disabled:opacity-60"
          >
            <Lock size={14} />
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
