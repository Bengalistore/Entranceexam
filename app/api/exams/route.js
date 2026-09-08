import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Exam from "@/models/Exam";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    const filter = {};
    for (const key of ["level", "category", "qualification", "stream"]) {
      const value = searchParams.get(key);
      if (value) filter[key] = value;
    }

    const search = searchParams.get("search");
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { eligibility: { $regex: search, $options: "i" } },
        { coursePurpose: { $regex: search, $options: "i" } },
      ];
    }

    const exams = await Exam.find(filter).sort({ examDate: 1 }).lean();
    return NextResponse.json({ exams });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch exams." }, { status: 500 });
  }
}

export async function POST(request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await request.json();

    const required = ["name", "level", "category", "qualification", "stream", "eligibility", "officialSite"];
    const missing = required.filter((field) => !body[field]);
    if (missing.length) {
      return NextResponse.json(
        { error: `Missing required field(s): ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const exam = await Exam.create(body);
    return NextResponse.json({ exam }, { status: 201 });
  } catch (err) {
    console.error(err);
    const message = err.name === "ValidationError" ? err.message : "Failed to create exam.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
