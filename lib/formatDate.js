export function formatDate(value) {
  if (!value) return "Not announced";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "Not announced";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Value suitable for an <input type="date"> from a stored Date/ISO string. */
export function toDateInputValue(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}
