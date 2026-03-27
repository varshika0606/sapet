const router = require("express").Router();
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/role");
const { policyValidator } = require("../validators/policyValidators");
const { validate } = require("../middleware/validate");
const {
  createPolicy,
  getPolicies,
  updatePolicy,
  deletePolicy,
} = require("../controllers/policyController");

router.get("/", protect, getPolicies);
router.post("/", protect, allowRoles("admin"), policyValidator, validate, createPolicy);
router.put("/:id", protect, allowRoles("admin"), updatePolicy);
router.delete("/:id", protect, allowRoles("admin"), deletePolicy);

module.exports = router;
