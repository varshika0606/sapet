const { body } = require("express-validator");

const policyValidator = [
  body("title").notEmpty(),
  body("code").notEmpty(),
  body("description").notEmpty(),
];

module.exports = { policyValidator };
