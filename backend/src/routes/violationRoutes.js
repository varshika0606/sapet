const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/role");
const { validate } = require("../middleware/validate");
const { violationValidator } = require("../validators/violationValidators");
const {
  createViolation,
  getViolations,
  getViolationById,
  withdrawViolation,
} = require("../controllers/violationController");

const uploadDir = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(__dirname, "..", "uploads");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
   destination: (req, file, cb) => cb(null, process.env.UPLOAD_DIR || "src/uploads"),
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

router.get("/", protect, getViolations);
router.get("/:id", protect, getViolationById);
router.patch("/:id/withdraw", protect, allowRoles("admin"), withdrawViolation);
router.post(
  "/",
  protect,
  allowRoles("faculty"),
  upload.single("evidence"),
  violationValidator,
  validate,
  createViolation
);

module.exports = router;
