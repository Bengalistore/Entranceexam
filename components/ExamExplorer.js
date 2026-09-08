"use client";

import { useEffect, useMemo, useState } from "react";
import FilterBar from "@/components/FilterBar";
import ExamCard from "@/components/ExamCard";
import { SearchX } from "lucide-react";

const EMPTY_FILTERS = { level: "", category: "", qualification: "", stream: "", search: "" };

export default function ExamExplorer({ initialExams }) {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [exams, setExams] = useState(initialExams);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return params.toString();
  }, [filters]);

  useEffect(() => {
    const isDefault = JSON.stringify(filters) === JSON.stringify(EMPTY_FILTERS);
    if (isDefault) {
      setExams(initialExams);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/exams?${queryString}`, { signal: controller.signal });
        if (!res.ok) throw new Error("Could not load exams right now.");
        const data = await res.json();
        setExams(data.exams || []);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 250); // debounce, mainly for the search field

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  return (
    <div className="space-y-6">
      <FilterBar filters={filters} onChange={setFilters} resultCount={exams.length} />

      {error ? (
        <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      <div
        className={`grid gap-5 sm:grid-cols-2 xl:grid-cols-3 transition-opacity ${
          loading ? "opacity-60" : "opacity-100"
        }`}
      >
        {exams.map((exam) => (
          <ExamCard key={exam._id} exam={exam} />
        ))}
      </div>

      {!loading && exams.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-ink-200 bg-white py-16 text-center">
          <SearchX size={28} className="text-ink-300" />
          <p className="text-sm text-ink-500">
            No exams match these filters yet. Try clearing one of them.
          </p>
        </div>
      ) : null}
    </div>
  );
}
