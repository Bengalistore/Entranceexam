import { Compass } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b border-ink-100 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80 sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-800 text-marigold">
            <Compass size={17} strokeWidth={2.25} />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-ink-800">
            ExamNiti
          </span>
        </a>
        <nav className="flex items-center gap-6 text-sm text-ink-500">
          <a href="/#exams" className="hover:text-ink-800 transition-colors">
            Browse exams
          </a>
          <a href="/#about" className="hover:text-ink-800 transition-colors hidden sm:inline">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
