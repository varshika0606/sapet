const router = require("express").Router();
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/role");
const { getAnalytics, getAuditLogs } = require("../controllers/adminController");

router.get("/analytics", protect, allowRoles("admin"), getAnalytics);
router.get("/audit-logs", protect, allowRoles("admin"), getAuditLogs);

module.exports = router;
