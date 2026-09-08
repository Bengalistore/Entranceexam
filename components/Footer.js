export default function Footer() {
  return (
    <footer id="about" className="border-t border-ink-100 bg-ink-800 text-ink-100">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="font-serif text-lg font-semibold text-white mb-2">ExamNiti</div>
          <p className="text-sm text-ink-300 leading-relaxed max-w-xs">
            A single, reliable map of India&apos;s entrance exams — what they
            test, who is eligible, and when to register — kept current for
            students planning their next step.
          </p>
        </div>
        <div>
          <div className="text-sm font-medium text-white mb-3">Levels</div>
          <ul className="space-y-1.5 text-sm text-ink-300">
            <li>National</li>
            <li>University</li>
            <li>State</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium text-white mb-3">Categories</div>
          <ul className="space-y-1.5 text-sm text-ink-300">
            <li>Engineering &middot; Medical &middot; Management</li>
            <li>Law &middot; Nursing &middot; Pharmacy</li>
            <li>Science &middot; Defence &middot; Other</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-700 py-4 text-center text-xs text-ink-400">
        &copy; {new Date().getFullYear()} ExamNiti. Information is collected
        for guidance only — always verify dates on the official exam website.
      </div>
    </footer>
  );
}
