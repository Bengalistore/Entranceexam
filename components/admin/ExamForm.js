"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LEVELS, CATEGORIES, QUALIFICATIONS, STREAMS } from "@/lib/examConstants";
import { toDateInputValue } from "@/lib/formatDate";

const inputClass =
  "mt-1.5 w-full rounded-md border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-800 outline-none focus:border-teal-deep";

function emptyForm() {
  return {
    name: "",
    level: LEVELS[0],
    category: CATEGORIES[0],
    qualification: QUALIFICATIONS[0],
    stream: STREAMS[0],
    eligibility: "",
    registrationStart: "",
    registrationEnd: "",
    examDate: "",
    subject: "",
    coursePurpose: "",
    officialSite: "",
    description: "",
  };
}

export default function ExamForm({ exam }) {
  const router = useRouter();
  const isEdit = Boolean(exam);

  const [form, setForm] = useState(() =>
    exam
      ? {
          ...emptyForm(),
          ...exam,
          registrationStart: toDateInputValue(exam.registrationStart),
          registrationEnd: toDateInputValue(exam.registrationEnd),
          examDate: toDateInputValue(exam.examDate),
        }
      : emptyForm()
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const url = isEdit ? `/api/exams/${exam._id}` : "/api/exams";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      router.push("/admin-9273");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-xs font-medium text-ink-500 sm:col-span-2">
          Exam name *
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Joint Entrance Examination (Main)"
            className={inputClass}
          />
        </label>

        <label className="block text-xs font-medium text-ink-500">
          Level *
          <select value={form.level} onChange={(e) => update("level", e.target.value)} className={inputClass}>
            {LEVELS.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-medium text-ink-500">
          Category *
          <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
            {CATEGORIES.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-medium text-ink-500">
          Qualification required *
          <select
            value={form.qualification}
            onChange={(e) => update("qualification", e.target.value)}
            className={inputClass}
          >
            {QUALIFICATIONS.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-medium text-ink-500">
          Stream *
          <select value={form.stream} onChange={(e) => update("stream", e.target.value)} className={inputClass}>
            {STREAMS.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>

        <label className="block text-xs font-medium text-ink-500 sm:col-span-2">
          Eligibility *
          <textarea
            required
            rows={2}
            value={form.eligibility}
            onChange={(e) => update("eligibility", e.target.value)}
            placeholder="e.g. Passed 12th with Physics, Chemistry and Mathematics"
            className={inputClass}
          />
        </label>

        <label className="block text-xs font-medium text-ink-500">
          Registration opens
          <input
            type="date"
            value={form.registrationStart}
            onChange={(e) => update("registrationStart", e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="block text-xs font-medium text-ink-500">
          Registration closes
          <input
            type="date"
            value={form.registrationEnd}
            onChange={(e) => update("registrationEnd", e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="block text-xs font-medium text-ink-500">
          Exam date
          <input
            type="date"
            value={form.examDate}
            onChange={(e) => update("examDate", e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="block text-xs font-medium text-ink-500">
          Subject(s)
          <input
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            placeholder="e.g. Physics, Chemistry, Mathematics"
            className={inputClass}
          />
        </label>

        <label className="block text-xs font-medium text-ink-500 sm:col-span-2">
          Course / purpose
          <input
            value={form.coursePurpose}
            onChange={(e) => update("coursePurpose", e.target.value)}
            placeholder="e.g. Admission to B.E. / B.Tech programmes"
            className={inputClass}
          />
        </label>

        <label className="block text-xs font-medium text-ink-500 sm:col-span-2">
          Official website *
          <input
            required
            type="url"
            value={form.officialSite}
            onChange={(e) => update("officialSite", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </label>

        <label className="block text-xs font-medium text-ink-500 sm:col-span-2">
          Notes (internal, optional)
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-ink-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : isEdit ? "Save changes" : "Add exam"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin-9273")}
          className="rounded-md border border-ink-100 px-5 py-2.5 text-sm font-medium text-ink-600 hover:bg-paper-dim"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
