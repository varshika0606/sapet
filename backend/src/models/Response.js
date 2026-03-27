const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    violation: { type: mongoose.Schema.Types.ObjectId, ref: "Violation", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    responseText: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);
