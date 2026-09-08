import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExamExplorer from "@/components/ExamExplorer";
import { dbConnect } from "@/lib/mongodb";
import Exam from "@/models/Exam";

export const dynamic = "force-dynamic";

async function getInitialExams() {
  try {
    await dbConnect();
    const exams = await Exam.find({}).sort({ examDate: 1 }).lean();
    return JSON.parse(JSON.stringify(exams));
  } catch (err) {
    console.error("Failed to load exams:", err.message);
    return [];
  }
}

export default async function HomePage() {
  const initialExams = await getInitialExams();

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <section className="border-b border-ink-100 bg-ink-800 text-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-serif text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl max-w-2xl">
            One map of every entrance exam worth knowing about in India.
          </p>
          <p className="mt-4 max-w-xl text-ink-200 sm:text-lg">
            Filter by level, category, qualification and stream to find the
            exam that fits your next step — with eligibility, registration
            windows and the official site, all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a
              href="#exams"
              className="rounded-md bg-marigold px-5 py-2.5 font-medium text-ink-800 transition-colors hover:bg-marigold-light"
            >
              Browse exams
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <ExamExplorer initialExams={initialExams} />
      </main>

      <Footer />
    </div>
  );
}
