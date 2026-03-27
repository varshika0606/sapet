const { body } = require("express-validator");

const responseValidator = [
  body("violation").notEmpty(),
  body("responseText").notEmpty(),
];

module.exports = { responseValidator };
