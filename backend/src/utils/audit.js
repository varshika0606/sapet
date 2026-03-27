const AuditLog = require("../models/AuditLog");

const audit = async ({ actor, action, entity, entityId, metadata, ip }) => {
  try {
    await AuditLog.create({ actor, action, entity, entityId, metadata, ip });
  } catch (err) {
    console.error("Audit log failed", err.message);
  }
};

module.exports = { audit };
