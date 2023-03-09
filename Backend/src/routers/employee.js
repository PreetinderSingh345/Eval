const express = require("express");
const employeeController = require("../controllers/employee");
const employeeValidator = require("../middlewares/employee");
const tokenValidator = require("../middlewares/tokenValidator");

const employeeRouter = express.Router();

employeeRouter.post("/", employeeController.createEmployee);

employeeRouter.get(
  "/:id",
  employeeValidator.getEmployeeValidator,
  tokenValidator,
  employeeController.getEmployeeById
);

module.exports = employeeRouter;
