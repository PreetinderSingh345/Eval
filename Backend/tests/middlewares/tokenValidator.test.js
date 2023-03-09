const axios = require("axios");
const tokenValidator = require("../../src/middlewares/tokenValidator");
const HttpError = require("../../src/utils/errors/HttpError");

jest.mock("axios");

describe("tokenValidator", () => {
  it("should call next if token is valid", async () => {
    const req = {
      headers: {
        authorization: "validToken",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    axios.get.mockResolvedValue({ status: 200 });

    await tokenValidator(req, res, next);

    expect(axios.get).toHaveBeenCalledWith("http://auth:5000/token/validate", {
      headers: {
        authorization: "validToken",
      },
    });

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it("should throw a 401 error if token is not provided", async () => {
    const req = {
      headers: {},
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    await tokenValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Unauthorized");
    expect(next).not.toHaveBeenCalled();
  });

  it("should throw a 401 error if token is invalid", async () => {
    const req = {
      headers: {
        authorization: "invalidToken",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    axios.get.mockResolvedValue({ status: 401 });

    await tokenValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Unauthorized");
    expect(next).not.toHaveBeenCalled();
  });

  it("should throw 500 error when an unexpected error occurs", async () => {
    const req = {
      headers: {
        authorization: "validToken",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    axios.get.mockRejectedValue(new Error("Unexpected error"));

    await tokenValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Unexpected error");
    expect(next).not.toHaveBeenCalled();
  });
});
