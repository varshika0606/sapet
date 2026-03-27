const { body } = require("express-validator");

const decisionValidator = [
  body("violation").notEmpty(),
  body("decision").isIn(["approved", "rejected", "disciplinary"]),
];

module.exports = { decisionValidator };
