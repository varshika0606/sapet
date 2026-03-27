const Response = require("../models/Response");
const Violation = require("../models/Violation");
const User = require("../models/User");
const { audit } = require("../utils/audit");
const { sendMail } = require("../config/mailer");
const { responseSubmitted } = require("../utils/emailTemplates");

const submitResponse = async (req, res) => {
  const { violation, responseText } = req.body;
  const violationDoc = await Violation.findById(violation).populate("student");
  if (!violationDoc) return res.status(404).json({ message: "Violation not found" });
  if (String(violationDoc.student._id) !== String(req.user._id)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const existing = await Response.findOne({ violation });
  if (existing) return res.status(400).json({ message: "Response already submitted" });

  const response = await Response.create({
    violation,
    student: req.user._id,
    responseText,
  });

  await Violation.findByIdAndUpdate(violation, { status: "responded" });

  await audit({
    actor: req.user._id,
    action: "submit_response",
    entity: "Response",
    entityId: response._id,
    ip: req.ip,
  });

  const admins = await User.find({ role: "admin" }).select("email");
  try {
    await sendMail({
      to: admins.map((a) => a.email),
      subject: "Student Response Submitted",
      html: responseSubmitted({ studentName: req.user.name }),
    });
  } catch (err) {
    console.error("Failed to send response email", err.message);
  }

  res.status(201).json(response);
};

const getResponses = async (req, res) => {
  const filter = {};
  if (req.user.role === "student") filter.student = req.user._id;
  const responses = await Response.find(filter)
    .populate("violation")
    .populate("student", "name email");
  res.json(responses);
};

module.exports = { submitResponse, getResponses };
