import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import Exam from "@/models/Exam";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTable from "@/components/admin/AdminTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!isAdminAuthenticated()) {
    redirect("/admin-9273/login");
  }

  await dbConnect();
  const exams = await Exam.find({}).sort({ createdAt: -1 }).lean();
  const plainExams = JSON.parse(JSON.stringify(exams));

  return (
    <div className="min-h-screen bg-paper">
      <AdminHeader />
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-semibold text-ink-800">Manage exams</h1>
          <p className="mt-1 text-sm text-ink-500">
            {plainExams.length} exam{plainExams.length === 1 ? "" : "s"} currently listed on the site.
          </p>
        </div>
        <AdminTable exams={plainExams} />
      </main>
    </div>
  );
}
