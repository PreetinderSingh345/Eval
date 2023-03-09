const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../database/models");
const { insertInRedis } = require("../utils/redis");

const addUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  const hashedPassword = user.password;

  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(email, process.env.TOKEN_SECRET);

  await insertInRedis(token);

  return token;
};

module.exports = { addUser, loginUser };
