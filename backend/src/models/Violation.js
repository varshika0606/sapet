const mongoose = require("mongoose");

const violationSchema = new mongoose.Schema(
  {
    policy: { type: mongoose.Schema.Types.ObjectId, ref: "Policy", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    evidenceUrl: { type: String },
    evidenceFile: { type: String },
    status: {
      type: String,
      enum: ["pending", "responded", "reviewed", "approved", "rejected"],
      enum: ["pending", "responded", "reviewed", "approved", "rejected", "withdrawn"],
      default: "pending",
    },
    reportedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Violation", violationSchema);
