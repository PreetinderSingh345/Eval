const contentController = require("../../src/controllers/content");
const contentService = require("../../src/services/content");
const HttpError = require("../../src/utils/errors/HttpError");

describe("createContent", () => {
  it("should create a content", async () => {
    const mockResolvedValue = {
      id: "1",
      name: "name",
      fields: {},
      entries: {},
    };

    jest
      .spyOn(contentService, "createContent")
      .mockResolvedValue(mockResolvedValue);

    const mockReq = {
      body: {
        name: "name",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await contentController.createContent(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResolvedValue);
  });

  it("should throw a 500 error when there is an unexpected error", async () => {
    jest
      .spyOn(contentService, "createContent")
      .mockRejectedValue(new Error("error"));

    const mockReq = {
      body: {
        name: "name",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.createContent(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith("error");
  });
});

describe("createContentField", () => {
  it("should create a content field", async () => {
    const mockResolvedValue = [1];

    jest
      .spyOn(contentService, "createContentField")
      .mockResolvedValue(mockResolvedValue);

    const mockReq = {
      params: {
        contentId: "1",
      },
      body: {
        field: "field3",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await contentController.createContentField(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResolvedValue);
  });

  it("should throw a 500 error when there is an unexpected error", async () => {
    jest
      .spyOn(contentService, "createContentField")
      .mockRejectedValue(new Error("error"));

    const mockReq = {
      params: {
        contentId: "1",
      },
      body: {
        field: "field3",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.createContentField(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith("error");
  });
});

describe("updateContentField", () => {
  it("should update a content field", async () => {
    const mockResolvedValue = [1];

    jest
      .spyOn(contentService, "updateContentField")
      .mockResolvedValue(mockResolvedValue);

    const mockReq = {
      params: {
        contentId: "1",
      },
      body: {
        prevFieldValue: "field1",
        newFieldValue: "field3",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await contentController.updateContentField(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResolvedValue);
  });

  it("should throw a 500 error when there is an unexpected error", async () => {
    jest
      .spyOn(contentService, "updateContentField")
      .mockRejectedValue(new Error("error"));

    const mockReq = {
      params: {
        contentId: "1",
      },
      body: {
        prevFieldValue: "field1",
        newFieldValue: "field3",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.updateContentField(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith("error");
  });
});

describe("deleteContentField", () => {
  it("should delete a content field", async () => {
    const mockResolvedValue = [1];

    jest
      .spyOn(contentService, "deleteContentField")
      .mockResolvedValue(mockResolvedValue);

    const mockReq = {
      params: {
        contentId: "1",
      },
      body: {
        field: "field1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await contentController.deleteContentField(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResolvedValue);
  });

  it("should throw a 500 error when there is an unexpected error", async () => {
    jest
      .spyOn(contentService, "deleteContentField")
      .mockRejectedValue(new Error("error"));

    const mockReq = {
      params: {
        contentId: "1",
      },
      body: {
        field: "field1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.deleteContentField(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith("error");
  });
});

describe("getContents", () => {
  it("should get all contents", async () => {
    const mockResolvedValue = [
      {
        id: "1",
        name: "name",
        fields: {
          field1: "type1",
          field2: "type2",
        },
        entries: {
          entry1: {
            field1: "value1",
            field2: "value2",
          },
          entry2: {
            field1: "value1",
            field2: "value2",
          },
        },
      },
      {
        id: "2",
        name: "name",
        fields: {
          field1: "type1",
          field2: "type2",
        },
        entries: {
          entry1: {
            field1: "value1",
            field2: "value2",
          },
          entry2: {
            field1: "value1",
            field2: "value2",
          },
        },
      },
    ];

    jest
      .spyOn(contentService, "getContents")
      .mockResolvedValue(mockResolvedValue);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await contentController.getContents(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResolvedValue);
  });

  it("should throw a 500 error when there is an unexpected error", async () => {
    jest
      .spyOn(contentService, "getContents")
      .mockRejectedValue(new Error("error"));

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.getContents(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith("error");
  });
});

describe("createContentEntry", () => {
  it("should create a content entry", async () => {
    const mockResolvedValue = {
      id: "1",
      name: "name",
      fields: {
        field1: "type1",
        field2: "type2",
      },
      entries: {
        entry1: {
          field1: "value1",
          field2: "value2",
        },
        entry2: {
          field1: "value1",
          field2: "value2",
        },
      },
    };

    jest
      .spyOn(contentService, "createContentEntry")
      .mockResolvedValue(mockResolvedValue);

    const mockReq = {
      params: {
        contentId: "1",
      },

      body: {
        field1: "value1",
        field2: "value2",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await contentController.createContentEntry(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResolvedValue);
  });

  it("should throw a 404 error when the content does not exist", async () => {
    jest.spyOn(contentService, "createContentEntry").mockImplementation(() => {
      throw new HttpError(404, "Content not found");
    });

    const mockReq = {
      params: {
        contentId: "1",
      },

      body: {
        field1: "value1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.createContentEntry(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);

    expect(mockRes.send).toHaveBeenCalledWith("Content not found");
  });

  it("should throw a 500 error when there is an unexpected error", async () => {
    jest
      .spyOn(contentService, "createContentEntry")
      .mockRejectedValue(new Error("error"));

    const mockReq = {
      params: {
        contentId: "1",
      },

      body: {
        field1: "value1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),

      send: jest.fn(),
    };

    await contentController.createContentEntry(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);

    expect(mockRes.send).toHaveBeenCalledWith("error");
  });
});

describe("updateContentEntry", () => {
  it("should update a content entry", async () => {
    const mockResolvedValue = {
      id: "1",
      name: "name",
      fields: {
        field1: "type1",
        field2: "type2",
      },
      entries: {
        entry1: {
          field1: "value1",
          field2: "value2",
        },
        entry2: {
          field1: "value1",
          field2: "value2",
        },
      },
    };

    jest
      .spyOn(contentService, "updateContentEntry")
      .mockResolvedValue(mockResolvedValue);

    const mockReq = {
      params: {
        contentId: "1",
        entryId: "entry1",
      },

      body: {
        field1: "value1",
        field2: "value2",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await contentController.updateContentEntry(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResolvedValue);
  });

  it("should throw a 500 error when there is an unexpected error", async () => {
    jest
      .spyOn(contentService, "updateContentEntry")
      .mockRejectedValue(new Error("error"));

    const mockReq = {
      params: {
        contentId: "1",
        entryId: "entry1",
      },

      body: {
        field1: "value1",
        field2: "value2",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.updateContentEntry(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith("error");
  });
});

describe("deleteContentEntry", () => {
  it("should delete a content entry", async () => {
    const mockResolvedValue = {
      id: "1",
      name: "name",
      fields: {
        field1: "type1",
        field2: "type2",
      },
      entries: {
        entry2: {
          field1: "value1",
          field2: "value2",
        },
      },
    };

    jest
      .spyOn(contentService, "deleteContentEntry")
      .mockResolvedValue(mockResolvedValue);

    const mockReq = {
      params: {
        contentId: "1",
        entryId: "entry1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await contentController.deleteContentEntry(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResolvedValue);
  });

  it("should throw a 404 error when the content does not exist", async () => {
    jest.spyOn(contentService, "deleteContentEntry").mockImplementation(() => {
      throw new HttpError(404, "Content not found");
    });

    const mockReq = {
      params: {
        contentId: "1",
        entryId: "entry1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.deleteContentEntry(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith("Content not found");
  });

  it("should throw a 500 error when there is an unexpected error", async () => {
    jest
      .spyOn(contentService, "deleteContentEntry")
      .mockRejectedValue(new Error("error"));

    const mockReq = {
      params: {
        contentId: "1",
        entryId: "entry1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.deleteContentEntry(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith("error");
  });
});
