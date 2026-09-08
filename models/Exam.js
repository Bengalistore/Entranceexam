import mongoose from "mongoose";
import { LEVELS, CATEGORIES, QUALIFICATIONS, STREAMS } from "@/lib/examConstants";

const ExamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: String, required: true, enum: LEVELS },
    category: { type: String, required: true, enum: CATEGORIES },
    qualification: { type: String, required: true, enum: QUALIFICATIONS },
    stream: { type: String, required: true, enum: STREAMS },
    eligibility: { type: String, required: true, trim: true },
    registrationStart: { type: Date },
    registrationEnd: { type: Date },
    examDate: { type: Date },
    subject: { type: String, trim: true },
    coursePurpose: { type: String, trim: true },
    officialSite: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

ExamSchema.index({ name: "text", eligibility: "text", subject: "text" });
ExamSchema.index({ level: 1, category: 1, qualification: 1, stream: 1 });

export default mongoose.models.Exam || mongoose.model("Exam", ExamSchema);
