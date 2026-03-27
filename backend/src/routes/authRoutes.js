const router = require("express").Router();
const { register, login, me } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../validators/authValidators");
const { validate } = require("../middleware/validate");
const { protect } = require("../middleware/auth");

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.get("/me", protect, me);

module.exports = router;
