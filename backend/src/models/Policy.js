const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String, required: true },
    category: { type: String, trim: true },
    status: { type: String, enum: ["active", "archived"], default: "active" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", policySchema);
