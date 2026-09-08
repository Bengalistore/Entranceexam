"use client";

import { useRouter } from "next/navigation";
import { Compass, LogOut, Plus } from "lucide-react";

export default function AdminHeader({ showAdd = true }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-9273/login");
    router.refresh();
  }

  return (
    <header className="border-b border-ink-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-800 text-marigold">
            <Compass size={16} strokeWidth={2.25} />
          </span>
          <span className="font-serif text-lg font-semibold text-ink-800">
            ExamNiti <span className="text-ink-400 font-sans text-sm font-normal">/ Admin</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {showAdd ? (
            <a
              href="/admin-9273/new"
              className="inline-flex items-center gap-1.5 rounded-md bg-ink-800 px-3.5 py-2 text-sm font-medium text-white hover:bg-ink-700"
            >
              <Plus size={15} /> Add exam
            </a>
          ) : null}
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-md border border-ink-100 px-3.5 py-2 text-sm font-medium text-ink-600 hover:bg-paper-dim"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
