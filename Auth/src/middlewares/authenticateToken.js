const jwt = require("jsonwebtoken");
const { getFromRedis } = require("../utils/redis.js");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("middleware called", token);

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, user) => {
      if (error) {
        res.status(403).json("Forbidden");
      } else {
        const tokenFromRedis = await getFromRedis("token");

        if (token === tokenFromRedis) {
          req.user = user;

          next();
        } else {
          res.status(401).json("Unauthorized");
        }
      }
    });
  } else {
    res.status(401).json("Unauthorized");
  }
};

module.exports = authenticateToken;
