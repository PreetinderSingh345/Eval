const contentController = require("../../src/controllers/content");
const contentService = require("../../src/services/content");
const HttpError = require("../../src/utils/errors/HttpError");

describe("createContent", () => {
  it("should create a content", async () => {
    const mockResolvedValue = {
      id: "1",
      name: "name",
      fields: {
        field1: "type1",
        field2: "type2",
      },
      entries: {},
    };

    jest
      .spyOn(contentService, "createContent")
      .mockResolvedValue(mockResolvedValue);

    const mockReq = {
      body: {
        name: "name",
        fields: {
          field1: "type1",
          field2: "type2",
        },
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
        fields: {
          field1: "type1",
          field2: "type2",
        },
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

describe("getContents", () => {
  it("should get all the contents", async () => {
    const mockResolvedValue = [
      {
        id: "1",
        name: "name1",
        fields: {
          field1: "type1",
          field2: "type2",
        },
        entries: {},
      },
      {
        id: "2",
        name: "name2",
        fields: {
          field1: "type1",
          field2: "type2",
        },
        entries: {},
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

describe("getContentFields", () => {
  it("should get all the fields of a content", async () => {
    const mockResolvedValue = {
      id: "1",
      name: "name",
      fields: {
        field1: "type1",
        field2: "type2",
      },
      entries: {},
    };

    jest
      .spyOn(contentService, "getContentFields")
      .mockResolvedValue(mockResolvedValue.fields);

    const mockReq = {
      params: {
        contentId: "1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await contentController.getContentFields(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResolvedValue.fields);
  });

  it("should throw a 404 error when the content does not exist", async () => {
    jest.spyOn(contentService, "getContentFields").mockImplementation(() => {
      throw new HttpError(404, "Content not found");
    });

    const mockReq = {
      params: {
        contentId: "1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.getContentFields(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith("Content not found");
  });

  it("should throw a 500 error when there is an unexpected error", async () => {
    jest
      .spyOn(contentService, "getContentFields")
      .mockRejectedValue(new Error("error"));

    const mockReq = {
      params: {
        contentId: "1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.getContentFields(mockReq, mockRes);

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

describe("getContentEntries", () => {
  it("should get all the entries of a content", async () => {
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
      .spyOn(contentService, "getContentEntries")
      .mockResolvedValue(mockResolvedValue.entries);

    const mockReq = {
      params: {
        contentId: "1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await contentController.getContentEntries(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResolvedValue.entries);
  });

  it("should throw a 404 error when the content does not exist", async () => {
    jest.spyOn(contentService, "getContentEntries").mockImplementation(() => {
      throw new HttpError(404, "Content not found");
    });

    const mockReq = {
      params: {
        contentId: "1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.getContentEntries(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith("Content not found");
  });

  it("should throw a 500 error when there is an unexpected error", async () => {
    jest
      .spyOn(contentService, "getContentEntries")
      .mockRejectedValue(new Error("error"));

    const mockReq = {
      params: {
        contentId: "1",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await contentController.getContentEntries(mockReq, mockRes);

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
