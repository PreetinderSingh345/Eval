const express = require("express");
const userController = require("../controllers/auth");
const authenticateToken = require("../middlewares/authenticateToken");

const userRouter = express.Router();

userRouter.post("/user", userController.addUser);
userRouter.post("/login", userController.loginUser);
userRouter.get(
  "/token/validate",
  authenticateToken,
  userController.validateToken
);

module.exports = userRouter;
