import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Exam from "@/models/Exam";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET(_request, { params }) {
  try {
    await dbConnect();
    const exam = await Exam.findById(params.id).lean();
    if (!exam) return NextResponse.json({ error: "Exam not found." }, { status: 404 });
    return NextResponse.json({ exam });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch exam." }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await request.json();
    const exam = await Exam.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!exam) return NextResponse.json({ error: "Exam not found." }, { status: 404 });
    return NextResponse.json({ exam });
  } catch (err) {
    console.error(err);
    const message = err.name === "ValidationError" ? err.message : "Failed to update exam.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request, { params }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    await dbConnect();
    const exam = await Exam.findByIdAndDelete(params.id);
    if (!exam) return NextResponse.json({ error: "Exam not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete exam." }, { status: 500 });
  }
}
