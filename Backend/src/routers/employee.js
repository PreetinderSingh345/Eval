const express = require("express");
const employeeController = require("../controllers/employee");
const employeeValidator = require("../middlewares/employee");

const employeeRouter = express.Router();

employeeRouter.post("/", employeeController.createEmployee);

employeeRouter.get(
  "/:id",
  employeeValidator.getEmployeeValidator,
  employeeController.getEmployeeById
);

module.exports = employeeRouter;
