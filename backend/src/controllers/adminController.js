const Violation = require("../models/Violation");
const Policy = require("../models/Policy");
const Response = require("../models/Response");
const Decision = require("../models/Decision");
const AuditLog = require("../models/AuditLog");
const { getPagination } = require("../utils/pagination");

const getAnalytics = async (req, res) => {
  const withdrawn = await Violation.find({ status: "withdrawn" }).select("_id");
  const withdrawnIds = withdrawn.map((v) => v._id);

  const [totalViolations, pending, responded, reviewed, approved, rejected] = await Promise.all([
    Violation.countDocuments({ status: { $ne: "withdrawn" } }),
    Violation.countDocuments({ status: "pending" }),
    Violation.countDocuments({ status: "responded" }),
    Violation.countDocuments({ status: "reviewed" }),
    Violation.countDocuments({ status: "approved" }),
    Violation.countDocuments({ status: "rejected" }),
  ]);

  const [totalPolicies, totalResponses, totalDecisions] = await Promise.all([
    Policy.countDocuments(),
    withdrawnIds.length
      ? Response.countDocuments({ violation: { $nin: withdrawnIds } })
      : Response.countDocuments(),
    withdrawnIds.length
      ? Decision.countDocuments({ status: { $ne: "withdrawn" }, violation: { $nin: withdrawnIds } })
      : Decision.countDocuments({ status: { $ne: "withdrawn" } }),
  ]);

  res.json({
    totalViolations,
    totalPolicies,
    totalResponses,
    totalDecisions,
    statusBreakdown: { pending, responded, reviewed, approved, rejected },
  });
};

const getAuditLogs = async (req, res) => {
  const { page, limit, skip } = getPagination(req);
  const [items, total] = await Promise.all([
    AuditLog.find({})
      .populate("actor", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    AuditLog.countDocuments(),
  ]);
  res.json({ items, total, page, limit });
};

module.exports = { getAnalytics, getAuditLogs };
