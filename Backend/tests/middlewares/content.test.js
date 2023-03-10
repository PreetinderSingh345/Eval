const contentValidator = require("../../src/middlewares/contentValidator");

describe("createContentValidator", () => {
  it("validate and call next if name is provided", () => {
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

    expect(next).toHaveBeenCalled();
  });

  it("should throw a 400 error if name is not provided", () => {
    const req = {
      body: {},
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

  it("should throw a 400 error if name is not a string", () => {
    const req = {
      body: {
        name: 123,
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.createContentValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"name" must be a string');
  });

  it("should throw a 500 error if an unexpected error occurs", () => {
    const req = {
      body: {
        name: "name",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn(() => {
      throw new Error("Unexpected error");
    });

    contentValidator.createContentValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Unexpected error");
  });
});

describe("createContentFieldValidator", () => {
  it("validate and call next if contentId and field are provided", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        field: "field",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.createContentFieldValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should throw a 400 error if contentId is not provided", () => {
    const req = {
      params: {},
      body: {
        field: "field",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.createContentFieldValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"contentId" is required');
  });

  it("should throw a 400 error if field is not provided", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {},
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.createContentFieldValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"field" is required');
  });

  it("should throw a 400 error if field is not a string", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        field: 123,
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.createContentFieldValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"field" must be a string');
  });

  it("should throw a 500 error if an unexpected error occurs", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        field: "field",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn(() => {
      throw new Error("Unexpected error");
    });

    contentValidator.createContentFieldValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.send).toHaveBeenCalledWith("Unexpected error");
  });
});

describe("updateContentFieldValidator", () => {
  it("validate and call next if contentId, prevFieldValue and newFieldValue are provided", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        prevFieldValue: "prevFieldValue",
        newFieldValue: "newFieldValue",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.updateContentFieldValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should throw a 400 error if contentId is not provided", () => {
    const req = {
      params: {},
      body: {
        prevFieldValue: "prevFieldValue",
        newFieldValue: "newFieldValue",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.updateContentFieldValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"contentId" is required');
  });

  it("should throw a 400 error if prevFieldValue is not a string", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        prevFieldValue: 123,
        newFieldValue: "newFieldValue",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.updateContentFieldValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"prevFieldValue" must be a string');
  });

  it("should throw a 500 error if something unexpected happens", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        prevFieldValue: "prevFieldValue",
        newFieldValue: "newFieldValue",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn(() => {
      throw new Error("Unexpected error");
    });

    contentValidator.updateContentFieldValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Unexpected error");
  });
});

describe("deleteContentFieldValidator", () => {
  it("validate and call next if contentId and fieldValue are provided", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        fieldValue: "fieldValue",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.deleteContentFieldValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should throw a 400 error if contentId is not provided", () => {
    const req = {
      params: {},
      body: {
        fieldValue: "fieldValue",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.deleteContentFieldValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"contentId" is required');
  });

  it("should throw a 400 error if fieldValue is not a string", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        fieldValue: 123,
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.deleteContentFieldValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"fieldValue" must be a string');
  });

  it("should throw a 500 error if something unexpected happens", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        fieldValue: "fieldValue",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn(() => {
      throw new Error("Unexpected error");
    });

    contentValidator.deleteContentFieldValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Unexpected error");
  });
});

describe("createContentEntryValidator", () => {
  it("validate and call next if contentId and entry are provided", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        entry: "entry",
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
        entry: "entry",
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

  it("should throw a 400 error if entry is not a string", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        entry: 123,
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.createContentEntryValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"entry" must be a string');
  });

  it("should throw a 500 error if something unexpected happens", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        entry: "entry",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn(() => {
      throw new Error("Unexpected error");
    });

    contentValidator.createContentEntryValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Unexpected error");
  });
});

describe("updateContentEntryValidator", () => {
  it("validate and call next if contentId and entryId are provided", () => {
    const req = {
      params: {
        contentId: "contentId",
        entryId: "entryId",
      },
      body: {
        entry: "entry",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.updateContentEntryValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should throw a 400 error if contentId is not provided", () => {
    const req = {
      params: {
        entryId: "entryId",
      },
      body: {
        entry: "entry",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.updateContentEntryValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"contentId" is required');
  });

  it("should throw a 400 error if entryId is not provided", () => {
    const req = {
      params: {
        contentId: "contentId",
      },
      body: {
        entry: "entry",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.updateContentEntryValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"entryId" is required');
  });

  it("should throw a 400 error if entry is not a string", () => {
    const req = {
      params: {
        contentId: "contentId",
        entryId: "entryId",
      },
      body: {
        entry: 123,
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn();

    contentValidator.updateContentEntryValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('"entry" must be a string');
  });

  it("should throw a 500 error if something unexpected happens", () => {
    const req = {
      params: {
        contentId: "contentId",
        entryId: "entryId",
      },

      body: {
        entry: "entry",
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    const next = jest.fn(() => {
      throw new Error("Unexpected error");
    });

    contentValidator.updateContentEntryValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Unexpected error");
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
