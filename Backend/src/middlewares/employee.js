const employeeSchema = require("../schemas/joiEmployee");
const HttpError = require("../utils/errors/HttpError");

const getEmployeeValidator = (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = employeeSchema.getEmployeeSchema.validate({ id });

    if (error) {
      throw new HttpError(400, error.details[0].message);
    }

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

module.exports = { getEmployeeValidator };
