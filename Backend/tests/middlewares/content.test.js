const contentValidator = require("../../src/middlewares/contentValidator");
const contentSchema = require("../../src/schemas/joiContent");

describe("createContentValidator", () => {
  it("validate and call next if name and fields are provided", () => {
    const req = {
      body: {
        name: "name",
        fields: {
          field1: "type1",
          field2: "type2",
        },
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.createContentValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should throw a 400 error if name is not provided", () => {
    const req = {
      body: {
        fields: {
          field1: "type1",
          field2: "type2",
        },
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.createContentValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"name" is required');
  });

  it("should throw a 400 error if fields is not provided", () => {
    const req = {
      body: {
        name: "name",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.createContentValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"fields" is required');
  });
});

describe("createContentEntryValidator", () => {
  it("validate and call next if contentId and entry are provided", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        field1: "value1",
        field2: "value2",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.createContentEntryValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should throw a 400 error if contentId is not provided", () => {
    const req = {
      params: {},
      body: {
        field1: "value1",
        field2: "value2",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.createContentEntryValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"contentId" is required');
  });

  it("should throw a 400 error if entry is not provided", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.createContentEntryValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"entry" is required');
  });
});

describe("getContentFieldsValidator", () => {
  it("validate and call next if contentId is provided", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.getContentFieldsValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should throw a 400 error if contentId is not provided", () => {
    const req = {
      params: {},
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.getContentFieldsValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"contentId" is required');
  });
});

describe("getContentEntriesValidator", () => {
  it("validate and call next if contentId is provided", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.getContentEntriesValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should throw a 400 error if contentId is not provided", () => {
    const req = {
      params: {},
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.getContentEntriesValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"contentId" is required');
  });
});

describe("deleteContentEntryValidator", () => {
  it("validate and call next if contentId and entryId are provided", () => {
    const req = {
      params: {
        contentId: "contentId",
        entryId: "entryId",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.deleteContentEntryValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should throw a 400 error if contentId is not provided", () => {
    const req = {
      params: {
        entryId: "entryId",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.deleteContentEntryValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"contentId" is required');
  });

  it("should throw a 400 error if entryId is not provided", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.deleteContentEntryValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"entryId" is required');
  });
});
