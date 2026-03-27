const { body } = require("express-validator");

const violationValidator = [
  body("policy").notEmpty(),
  body("student").notEmpty(),
  body("description").notEmpty(),
];

module.exports = { violationValidator };
