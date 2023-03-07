const employeeServices = require("../services/employee");
const HttpError = require("../utils/errors/HttpError");

const createEmployee = async (req, res) => {
  try {
    const { name, email, firmNumber } = req.body;

    const employee = await employeeServices.createEmployee({
      name,
      email,
      firmNumber,
    });

    res.status(201).json(employee);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employees = await employeeServices.getEmployeeById(id);

    res.status(200).json(employees);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

module.exports = { createEmployee, getEmployeeById };
