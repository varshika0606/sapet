const Decision = require("../models/Decision");
const Violation = require("../models/Violation");
const User = require("../models/User");
const { audit } = require("../utils/audit");
const { sendMail } = require("../config/mailer");
const { decisionMade } = require("../utils/emailTemplates");

const makeDecision = async (req, res) => {
  const { violation, decision, action, notes } = req.body;
  const violationDoc = await Violation.findById(violation).populate("student");
  if (!violationDoc) return res.status(404).json({ message: "Violation not found" });

  const decisionDoc = await Decision.create({
    violation,
    admin: req.user._id,
    decision,
    action,
    notes,
  });

  const statusMap = {
    approved: "approved",
    rejected: "rejected",
    disciplinary: "reviewed",
  };
  await Violation.findByIdAndUpdate(violation, { status: statusMap[decision] || "reviewed" });

  await audit({
    actor: req.user._id,
    action: "make_decision",
    entity: "Decision",
    entityId: decisionDoc._id,
    ip: req.ip,
  });

  await sendMail({
    to: violationDoc.student.email,
    subject: "Violation Decision",
    html: decisionMade({ decision, action }),
  });

  res.status(201).json(decisionDoc);
};

const getDecisions = async (req, res) => {
  const filter = {};
  const withdrawn = await Violation.find({ status: "withdrawn" }).select("_id");
  const withdrawnIds = withdrawn.map((v) => v._id);

  if (req.user.role === "student") {
    const violations = await Violation.find({ student: req.user._id }).select("_id");
    filter.violation = { $in: violations.map((v) => v._id) };
    const ids = violations.map((v) => v._id);
    filter.$and = [{ violation: { $in: ids } }, { violation: { $nin: withdrawnIds } }];
  } else if (withdrawnIds.length) {
    filter.violation = { $nin: withdrawnIds };
  }

  if (!req.query.status) filter.status = { $ne: "withdrawn" };
  if (req.query.status) filter.status = req.query.status;
  const decisions = await Decision.find(filter)
    .populate({
      path: "violation",
      populate: [
        { path: "student", select: "name email studentId" },
        { path: "policy", select: "title code" },
      ],
    })
    .populate("admin", "name email");
  res.json(decisions);
};
module.exports = { makeDecision, getDecisions };
const withdrawDecision = async (req, res) => {
  const decisionDoc = await Decision.findById(req.params.id);
  if (!decisionDoc) return res.status(404).json({ message: "Decision not found" });
  if (decisionDoc.status === "withdrawn") return res.json(decisionDoc);

  decisionDoc.status = "withdrawn";
  await decisionDoc.save();

  await Violation.findByIdAndUpdate(decisionDoc.violation, { status: "responded" });

  await audit({
    actor: req.user._id,
    action: "withdraw_decision",
    entity: "Decision",
    entityId: decisionDoc._id,
    ip: req.ip,
  });

  res.json(decisionDoc);
};

module.exports = { makeDecision, getDecisions, withdrawDecision };
