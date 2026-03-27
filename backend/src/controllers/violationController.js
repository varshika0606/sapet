const Violation = require("../models/Violation");
const Policy = require("../models/Policy");
const User = require("../models/User");
const { getPagination } = require("../utils/pagination");
const { audit } = require("../utils/audit");
const { sendMail } = require("../config/mailer");
const { violationReported } = require("../utils/emailTemplates");

const createViolation = async (req, res) => {
  const { policy, student, description, evidenceUrl } = req.body;
  const policyDoc = await Policy.findById(policy);
  if (!policyDoc) return res.status(404).json({ message: "Policy not found" });
  const studentDoc = await User.findById(student);
  if (!studentDoc) return res.status(404).json({ message: "Student not found" });

  const violation = await Violation.create({
    policy,
    student,
    faculty: req.user._id,
    description,
    evidenceUrl,
    evidenceFile: req.file ? `/uploads/${req.file.filename}` : undefined,
  });

  await audit({
    actor: req.user._id,
    action: "report_violation",
    entity: "Violation",
    entityId: violation._id,
    ip: req.ip,
  });
   await sendMail({
    to: studentDoc.email,
    subject: "Violation Reported",
    html: violationReported({
      studentName: studentDoc.name,
      policyTitle: policyDoc.title,
    }),
  });
  try {
    await sendMail({
      to: studentDoc.email,
      subject: "Violation Reported",
      html: violationReported({
        studentName: studentDoc.name,
        policyTitle: policyDoc.title,
      }),
    });
  } catch (err) {
    console.error("Failed to send violation email", err.message);
  }

  res.status(201).json(violation);
};

const getViolations = async (req, res) => {
  res.set("Cache-Control", "no-store");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  const { page, limit, skip } = getPagination(req);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.status) {
    filter.status = req.query.status;
  } else {
    filter.status = { $ne: "withdrawn" };
  }
  if (req.user.role === "faculty") filter.faculty = req.user._id;
  if (req.user.role === "student") filter.student = req.user._id;

  if (req.query.q) {
    filter.$or = [
      { description: { $regex: req.query.q, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    Violation.find(filter)
      .populate("policy")
      .populate("student", "name email studentId")
      .populate("faculty", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Violation.countDocuments(filter),
  ]);

  res.json({ items, total, page, limit });
};

const getViolationById = async (req, res) => {
  const violation = await Violation.findById(req.params.id)
    .populate("policy")
    .populate("student", "name email studentId")
    .populate("faculty", "name email");
  if (!violation) return res.status(404).json({ message: "Violation not found" });

  if (req.user.role === "faculty" && String(violation.faculty._id) !== String(req.user._id)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  if (req.user.role === "student" && String(violation.student._id) !== String(req.user._id)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(violation);
};
module.exports = { createViolation, getViolations, getViolationById };
const withdrawViolation = async (req, res) => {
  const violation = await Violation.findById(req.params.id);
  if (!violation) return res.status(404).json({ message: "Violation not found" });
  if (violation.status === "withdrawn") {
    return res.json(violation);
  }

  violation.status = "withdrawn";
  await violation.save();

  await audit({
    actor: req.user._id,
    action: "withdraw_violation",
    entity: "Violation",
    entityId: violation._id,
    ip: req.ip,
  });

  res.json(violation);
};

module.exports = { createViolation, getViolations, getViolationById, withdrawViolation };
