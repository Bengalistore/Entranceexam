"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/formatDate";

export default function AdminTable({ exams }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  async function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`/api/exams/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete.");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (exams.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-ink-200 bg-white py-14 text-center text-sm text-ink-500">
        No exams added yet. Use &quot;Add exam&quot; to create the first listing.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink-100 bg-white shadow-card">
      {error ? (
        <p className="border-b border-rose-200 bg-rose-50 px-5 py-2.5 text-sm text-rose-700">
          {error}
        </p>
      ) : null}
      <table className="w-full text-left text-sm">
        <thead className="bg-paper-dim text-xs uppercase tracking-wide text-ink-400">
          <tr>
            <th className="px-5 py-3 font-medium">Exam</th>
            <th className="px-5 py-3 font-medium">Level</th>
            <th className="px-5 py-3 font-medium">Category</th>
            <th className="px-5 py-3 font-medium">Exam date</th>
            <th className="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {exams.map((exam) => (
            <tr key={exam._id}>
              <td className="px-5 py-3.5 font-medium text-ink-800">{exam.name}</td>
              <td className="px-5 py-3.5 text-ink-500">{exam.level}</td>
              <td className="px-5 py-3.5 text-ink-500">{exam.category}</td>
              <td className="px-5 py-3.5 text-ink-500">{formatDate(exam.examDate)}</td>
              <td className="px-5 py-3.5">
                <div className="flex justify-end gap-2">
                  <a
                    href={`/admin-9273/edit/${exam._id}`}
                    className="inline-flex items-center gap-1 rounded-md border border-ink-100 px-2.5 py-1.5 text-xs font-medium text-ink-600 hover:bg-paper-dim"
                  >
                    <Pencil size={13} /> Edit
                  </a>
                  <button
                    type="button"
                    disabled={deletingId === exam._id}
                    onClick={() => handleDelete(exam._id, exam.name)}
                    className="inline-flex items-center gap-1 rounded-md border border-rose-200 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 disabled:opacity-60"
                  >
                    <Trash2 size={13} /> {deletingId === exam._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
