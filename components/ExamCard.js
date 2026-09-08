import { ArrowUpRight, CalendarClock, GraduationCap, Layers } from "lucide-react";
import { categoryStyle } from "@/lib/categoryStyles";
import { formatDate } from "@/lib/formatDate";

export default function ExamCard({ exam }) {
  const style = categoryStyle(exam.category);

  return (
    <article className="group relative flex overflow-hidden rounded-lg border border-ink-100 bg-white shadow-card transition-shadow hover:shadow-lg">
      <div className={`w-1.5 shrink-0 ${style.bar}`} aria-hidden="true" />
      <div className="flex-1 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-semibold leading-snug text-ink-800">
              {exam.name}
            </h3>
            <p className="mt-1 text-sm text-ink-500">{exam.coursePurpose}</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${style.bg} ${style.text}`}
          >
            {exam.category}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <Layers size={14} strokeWidth={2} />
            {exam.level} &middot; {exam.stream}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap size={14} strokeWidth={2} />
            After {exam.qualification}
          </span>
          {exam.subject ? (
            <span className="inline-flex items-center gap-1.5">
              Subjects: {exam.subject}
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-sm text-ink-600 leading-relaxed">
          <span className="font-medium text-ink-800">Eligibility: </span>
          {exam.eligibility}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-md bg-paper-dim/70 p-3 text-xs">
          <div>
            <div className="text-ink-400">Registration opens</div>
            <div className="mt-0.5 font-medium text-ink-800">
              {formatDate(exam.registrationStart)}
            </div>
          </div>
          <div>
            <div className="text-ink-400">Registration closes</div>
            <div className="mt-0.5 font-medium text-ink-800">
              {formatDate(exam.registrationEnd)}
            </div>
          </div>
          <div>
            <div className="text-ink-400 inline-flex items-center gap-1">
              <CalendarClock size={12} /> Exam date
            </div>
            <div className="mt-0.5 font-medium text-ink-800">
              {formatDate(exam.examDate)}
            </div>
          </div>
        </div>

        <a
          href={exam.officialSite}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-deep hover:text-ink-800 transition-colors"
        >
          Official website
          <ArrowUpRight size={15} strokeWidth={2.25} />
        </a>
      </div>
    </article>
  );
}
