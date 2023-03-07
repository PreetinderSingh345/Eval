const joi = require("joi");

const getEmployeeSchema = joi.object({
  id: joi.number().integer().required(),
});

module.exports = { getEmployeeSchema };
