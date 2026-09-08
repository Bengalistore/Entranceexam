"use client";

import { Search } from "lucide-react";
import { LEVELS, CATEGORIES, QUALIFICATIONS, STREAMS } from "@/lib/examConstants";

const selectClass =
  "w-full appearance-none rounded-md border border-ink-100 bg-white py-2.5 pl-3 pr-8 text-sm text-ink-800 shadow-sm transition-colors hover:border-ink-200 focus:border-teal-deep";

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-500">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function FilterBar({ filters, onChange, resultCount }) {
  const update = (key) => (value) => onChange({ ...filters, [key]: value });

  return (
    <div id="exams" className="rounded-xl border border-ink-100 bg-white p-5 shadow-card sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-500 lg:col-span-1">
          Search
          <span className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300"
            />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => update("search")(e.target.value)}
              placeholder="Exam name, subject..."
              className={`${selectClass} pl-8`}
            />
          </span>
        </label>
        <Select label="Level" value={filters.level} onChange={update("level")} options={LEVELS} />
        <Select
          label="Category"
          value={filters.category}
          onChange={update("category")}
          options={CATEGORIES}
        />
        <Select
          label="Qualification"
          value={filters.qualification}
          onChange={update("qualification")}
          options={QUALIFICATIONS}
        />
        <Select
          label="Stream"
          value={filters.stream}
          onChange={update("stream")}
          options={STREAMS}
        />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3 text-xs text-ink-400">
        <span>
          {resultCount} exam{resultCount === 1 ? "" : "s"} match your filters
        </span>
        <button
          type="button"
          onClick={() =>
            onChange({ level: "", category: "", qualification: "", stream: "", search: "" })
          }
          className="font-medium text-teal-deep hover:text-ink-800"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
