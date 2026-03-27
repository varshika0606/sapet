const { body } = require("express-validator");

const registerValidator = [
  body("name").notEmpty().withMessage("Name required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 8 }).withMessage("Min 8 chars"),
  body("role").optional().isIn(["admin", "faculty", "student"]),
];

const loginValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required"),
];

module.exports = { registerValidator, loginValidator };
