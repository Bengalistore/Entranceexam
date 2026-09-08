import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import AdminHeader from "@/components/admin/AdminHeader";
import ExamForm from "@/components/admin/ExamForm";

export default function NewExamPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin-9273/login");
  }

  return (
    <div className="min-h-screen bg-paper">
      <AdminHeader showAdd={false} />
      <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
        <h1 className="mb-6 font-serif text-2xl font-semibold text-ink-800">Add a new exam</h1>
        <div className="rounded-xl border border-ink-100 bg-white p-6 shadow-card">
          <ExamForm />
        </div>
      </main>
    </div>
  );
}
