const { Employee } = require("../../database/models/index");
const HttpError = require("../utils/errors/HttpError");

const createEmployee = async ({ name, email, firmNumber }) => {
  const employee = await Employee.create({
    name,
    email,
    firmNumber,
  });

  return employee;
};

const getEmployeeById = async (id) => {
  const employee = await Employee.findOne({
    where: { id },
  });

  if (!employee) {
    throw new HttpError(404, "Employee not found");
  }

  return employee;
};

module.exports = { createEmployee, getEmployeeById };
