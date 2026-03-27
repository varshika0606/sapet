const router = require("express").Router();
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/role");
const { getUsers } = require("../controllers/userController");

router.get("/", protect, allowRoles("admin", "faculty"), getUsers);

module.exports = router;
