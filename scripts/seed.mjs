// Populates the database with a handful of well-known Indian entrance exams
// so the site has content to show immediately after setup.
//
// Usage:  npm run seed
// Requires MONGODB_URI to be set (in your shell env, or a .env.local loaded
// via `node --env-file=.env.local scripts/seed.mjs`).

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set. Set it in your environment before running the seed script.");
  process.exit(1);
}

const ExamSchema = new mongoose.Schema(
  {
    name: String,
    level: String,
    category: String,
    qualification: String,
    stream: String,
    eligibility: String,
    registrationStart: Date,
    registrationEnd: Date,
    examDate: Date,
    subject: String,
    coursePurpose: String,
    officialSite: String,
    description: String,
  },
  { timestamps: true }
);

const Exam = mongoose.models.Exam || mongoose.model("Exam", ExamSchema);

const sampleExams = [
  {
    name: "Joint Entrance Examination (Main) — JEE Main",
    level: "National",
    category: "Engineering",
    qualification: "12th",
    stream: "Science",
    eligibility: "Passed 12th with Physics, Chemistry and Mathematics.",
    registrationStart: "2027-01-05",
    registrationEnd: "2027-02-15",
    examDate: "2027-04-06",
    subject: "Physics, Chemistry, Mathematics",
    coursePurpose: "Admission to B.E./B.Tech at NITs, IIITs and gateway to JEE Advanced (IITs)",
    officialSite: "https://jeemain.nta.nic.in",
  },
  {
    name: "National Eligibility cum Entrance Test — NEET (UG)",
    level: "National",
    category: "Medical",
    qualification: "12th",
    stream: "Science",
    eligibility: "Passed 12th with Physics, Chemistry, Biology/Biotechnology.",
    registrationStart: "2027-02-01",
    registrationEnd: "2027-03-10",
    examDate: "2027-05-03",
    subject: "Physics, Chemistry, Biology",
    coursePurpose: "Admission to MBBS, BDS and AYUSH courses",
    officialSite: "https://neet.nta.nic.in",
  },
  {
    name: "Common Admission Test — CAT",
    level: "National",
    category: "Management",
    qualification: "Graduation",
    stream: "Commerce",
    eligibility: "Bachelor's degree with at least 50% marks (45% for reserved categories).",
    registrationStart: "2027-08-01",
    registrationEnd: "2027-09-20",
    examDate: "2027-11-28",
    subject: "Quantitative Ability, DILR, Verbal Ability",
    coursePurpose: "Admission to MBA/PGDM at IIMs and top B-schools",
    officialSite: "https://iimcat.ac.in",
  },
  {
    name: "Common Law Admission Test — CLAT",
    level: "National",
    category: "Law",
    qualification: "12th",
    stream: "Arts",
    eligibility: "Passed 12th in any stream with minimum 45% marks.",
    registrationStart: "2027-07-01",
    registrationEnd: "2027-11-01",
    examDate: "2027-12-01",
    subject: "Legal Reasoning, Logical Reasoning, English, GK, Maths",
    coursePurpose: "Admission to 5-year integrated LLB and LLM programmes at NLUs",
    officialSite: "https://consortiumofnlus.ac.in",
  },
  {
    name: "GPAT — Graduate Pharmacy Aptitude Test",
    level: "National",
    category: "Pharmacy",
    qualification: "Graduation",
    stream: "Science",
    eligibility: "B.Pharm degree or final-year B.Pharm students.",
    registrationStart: "2027-01-10",
    registrationEnd: "2027-02-20",
    examDate: "2027-03-15",
    subject: "Pharmaceutics, Pharmacology, Pharmaceutical Chemistry",
    coursePurpose: "Admission to M.Pharm and scholarship (AICTE) eligibility",
    officialSite: "https://gpat.nta.nic.in",
  },
  {
    name: "National Defence Academy Exam — NDA",
    level: "National",
    category: "Defence",
    qualification: "12th",
    stream: "Science",
    eligibility: "Unmarried male/female candidates who passed or are appearing in 12th.",
    registrationStart: "2027-01-02",
    registrationEnd: "2027-01-21",
    examDate: "2027-04-18",
    subject: "Mathematics, General Ability Test",
    coursePurpose: "Entry to Army, Navy and Air Force wings of the National Defence Academy",
    officialSite: "https://upsc.gov.in",
  },
  {
    name: "State CET — Maharashtra (MHT-CET)",
    level: "State",
    category: "Engineering",
    qualification: "12th",
    stream: "Science",
    eligibility: "Passed 12th with Physics, Chemistry, Mathematics/Biology and Maharashtra domicile preference.",
    registrationStart: "2027-02-10",
    registrationEnd: "2027-03-25",
    examDate: "2027-05-02",
    subject: "Physics, Chemistry, Mathematics/Biology",
    coursePurpose: "Admission to engineering and pharmacy colleges in Maharashtra",
    officialSite: "https://cetcell.mahacet.org",
  },
  {
    name: "University Entrance Test — DUET (Nursing)",
    level: "University",
    category: "Nursing",
    qualification: "12th",
    stream: "Science",
    eligibility: "Passed 12th with Science and a minimum aggregate as prescribed by the university.",
    registrationStart: "2027-05-01",
    registrationEnd: "2027-06-05",
    examDate: "2027-06-25",
    subject: "Biology, Chemistry, General Aptitude",
    coursePurpose: "Admission to B.Sc. Nursing at the university's affiliated colleges",
    officialSite: "https://du.ac.in",
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  await Exam.deleteMany({});
  console.log("Cleared existing exams.");

  await Exam.insertMany(sampleExams);
  console.log(`Inserted ${sampleExams.length} sample exams.`);

  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
