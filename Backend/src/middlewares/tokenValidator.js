const axios = require("axios");
const HttpError = require("../utils/errors/HttpError");

const tokenValidator = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new HttpError(401, "Unauthorized");
    }

    const response = await axios.get("http://auth:5000/token/validate", {
      headers: {
        authorization: token,
      },
    });

    if (response.status !== 200) {
      throw new HttpError(401, "Unauthorized");
    }

    next();
  } catch (error) {
    console.log("in error of backend", error);
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

module.exports = tokenValidator;
