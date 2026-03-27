const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    metadata: { type: Object },
    ip: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
