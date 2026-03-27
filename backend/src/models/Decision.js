const mongoose = require("mongoose");

const decisionSchema = new mongoose.Schema(
  {
    violation: { type: mongoose.Schema.Types.ObjectId, ref: "Violation", required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    decision: { type: String, enum: ["approved", "rejected", "disciplinary"], required: true },
    action: { type: String },
    notes: { type: String },
    decidedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "withdrawn"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Decision", decisionSchema);
