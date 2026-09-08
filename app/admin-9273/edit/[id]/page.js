import { redirect, notFound } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import Exam from "@/models/Exam";
import AdminHeader from "@/components/admin/AdminHeader";
import ExamForm from "@/components/admin/ExamForm";

export const dynamic = "force-dynamic";

export default async function EditExamPage({ params }) {
  if (!isAdminAuthenticated()) {
    redirect("/admin-9273/login");
  }

  await dbConnect();
  const exam = await Exam.findById(params.id).lean().catch(() => null);
  if (!exam) notFound();

  return (
    <div className="min-h-screen bg-paper">
      <AdminHeader showAdd={false} />
      <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
        <h1 className="mb-6 font-serif text-2xl font-semibold text-ink-800">Edit exam</h1>
        <div className="rounded-xl border border-ink-100 bg-white p-6 shadow-card">
          <ExamForm exam={JSON.parse(JSON.stringify(exam))} />
        </div>
      </main>
    </div>
  );
}
