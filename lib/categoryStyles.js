export const CATEGORY_STYLES = {
  Engineering: { bar: "bg-blue-600", text: "text-blue-700", bg: "bg-blue-50" },
  Medical: { bar: "bg-rose-600", text: "text-rose-700", bg: "bg-rose-50" },
  Management: { bar: "bg-violet-600", text: "text-violet-700", bg: "bg-violet-50" },
  Law: { bar: "bg-slate-600", text: "text-slate-700", bg: "bg-slate-50" },
  Nursing: { bar: "bg-pink-600", text: "text-pink-700", bg: "bg-pink-50" },
  Pharmacy: { bar: "bg-emerald-600", text: "text-emerald-700", bg: "bg-emerald-50" },
  Science: { bar: "bg-teal-600", text: "text-teal-700", bg: "bg-teal-50" },
  Defence: { bar: "bg-lime-700", text: "text-lime-800", bg: "bg-lime-50" },
  Other: { bar: "bg-ink-400", text: "text-ink-500", bg: "bg-ink-50" },
};

export function categoryStyle(category) {
  return CATEGORY_STYLES[category] || CATEGORY_STYLES.Other;
}
