require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Policy = require("../models/Policy");
const Violation = require("../models/Violation");
const Response = require("../models/Response");
const Decision = require("../models/Decision");

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Policy.deleteMany({}),
    Violation.deleteMany({}),
    Response.deleteMany({}),
    Decision.deleteMany({}),
    require("../models/AuditLog").deleteMany({}),
  ]);

  const admin = await User.create({
    name: "SRIVINI S",
    email: "srivini@gmail.com",
    password: "srivini@123",
    role: "admin",
  });

  const faculty = await User.create({
    name: "VARSHIKA S",
    email: "varshi@gmail.com",
    password: "varshi@123",
    role: "faculty",
    department: "Computer Science",
  });

  const student = await User.create({
    name: "SUGASHINI M",
    email: "suga@gmail.com",
    password: "suga@123",
    role: "student",
    studentId: "STU1001",
  });

  const policy = await Policy.create({
    title: "Plagiarism",
    code: "POL-PLAG-001",
    description: "Submitting work that is not your own is prohibited.",
    category: "Academic Integrity",
    createdBy: admin._id,
  });

  await Policy.insertMany([
    {
      title: "Unauthorized Collaboration",
      code: "POL-COLL-002",
      description: "Working with others on individual assignments without permission.",
      category: "Academic Integrity",
      createdBy: admin._id,
    },
    {
      title: "Cheating in Exams",
      code: "POL-EXAM-003",
      description: "Using unfair means during tests or exams.",
      category: "Examination Conduct",
      createdBy: admin._id,
    },
    {
      title: "Fabrication of Data",
      code: "POL-DATA-004",
      description: "Inventing or altering research data or results.",
      category: "Research Ethics",
      createdBy: admin._id,
    },
    {
      title: "Proxy Attendance",
      code: "POL-PROX-005",
      description: "Attending or signing in on behalf of another student.",
      category: "Attendance",
      createdBy: admin._id,
    },
    {
      title: "Lab Safety Violation",
      code: "POL-LAB-006",
      description: "Ignoring safety procedures in laboratories.",
      category: "Lab Safety",
      createdBy: admin._id,
    },
    {
      title: "Dress Code Violation",
      code: "POL-DRESS-011",
      description: "Non-compliance with institutional dress code guidelines.",
      category: "Student Conduct",
      createdBy: admin._id,
    },
  ]);

  const violation = await Violation.create({
    policy: policy._id,
    student: student._id,
    faculty: faculty._id,
    description: "Similarity score above threshold in assignment 3.",
    status: "pending",
  });

  await Response.create({
    violation: violation._id,
    student: student._id,
    responseText: "I collaborated but did not copy; requesting re-evaluation.",
  });

  await Decision.create({
    violation: violation._id,
    admin: admin._id,
    decision: "disciplinary",
    action: "Warning and mandatory integrity workshop",
    notes: "First-time offense",
  });

  console.log("Seed data created");
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
