const router = require("express").Router();
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/role");
const { validate } = require("../middleware/validate");
const { responseValidator } = require("../validators/responseValidators");
const { submitResponse, getResponses } = require("../controllers/responseController");

router.get("/", protect, getResponses);
router.post("/", protect, allowRoles("student"), responseValidator, validate, submitResponse);

module.exports = router;
