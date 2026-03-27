const router = require("express").Router();
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/role");
const { validate } = require("../middleware/validate");
const { decisionValidator } = require("../validators/decisionValidators");
const { makeDecision, getDecisions, withdrawDecision } = require("../controllers/decisionController");

router.get("/", protect, getDecisions);
router.post("/", protect, allowRoles("admin"), decisionValidator, validate, makeDecision);
router.patch("/:id/withdraw", protect, allowRoles("admin"), withdrawDecision);

module.exports = router;
