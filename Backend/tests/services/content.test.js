const contentService = require("../../src/services/content");
const { Content } = require("../../database/models");
const HttpError = require("../../src/utils/errors/HttpError");

describe("createContent", () => {
  it("should create a content", async () => {
    const mockResolvedValue = {
      id: "1",
      name: "name",
      fields: {},
      entries: {},
    };

    jest.spyOn(Content, "create").mockResolvedValue(mockResolvedValue);

    const content = await contentService.createContent({
      name: "name",
    });

    expect(content).toEqual(mockResolvedValue);
  });
});

describe("createContentField", () => {
  it("should create a content field", async () => {
    const mockResolvedValueFindOne = {
      id: "1",
      name: "name",
      fields: {
        field1: "type1",
        field2: "type2",
      },
      entries: {},
    };

    jest.spyOn(Content, "findOne").mockResolvedValue(mockResolvedValueFindOne);

    const mockResolvedValueUpdate = [1];

    jest.spyOn(Content, "update").mockResolvedValue(mockResolvedValueUpdate);

    const content = await contentService.createContentField("1", "field3");

    expect(content).toEqual(mockResolvedValueUpdate);
  });

  it("should create a content field and update the entries", async () => {
    const mockResolvedValueFindOne = {
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

    jest.spyOn(Content, "findOne").mockResolvedValue(mockResolvedValueFindOne);

    const mockResolvedValueUpdate = [1];

    jest.spyOn(Content, "update").mockResolvedValue(mockResolvedValueUpdate);

    const content = await contentService.createContentField("1", "field3");

    expect(content).toEqual(mockResolvedValueUpdate);
  });

  it("should throw an error if the content does not exist", async () => {
    jest.spyOn(Content, "findOne").mockResolvedValue(null);

    await expect(
      contentService.createContentField("1", "field3")
    ).rejects.toThrow(new HttpError(404, "Content not found"));
  });
});

describe("updateContentField", () => {
  it("should update a content field", async () => {
    const mockResolvedValueFindOne = {
      id: "1",
      name: "name",
      fields: {
        field1: "type1",
        field2: "type2",
      },
      entries: {},
    };

    jest.spyOn(Content, "findOne").mockResolvedValue(mockResolvedValueFindOne);

    const mockResolvedValueUpdate = [1];

    jest.spyOn(Content, "update").mockResolvedValue(mockResolvedValueUpdate);

    const content = await contentService.updateContentField(
      "1",
      "field1",
      "type3"
    );

    expect(content).toEqual(mockResolvedValueUpdate);
  });

  it("should throw an error if the content does not exist", async () => {
    jest.spyOn(Content, "findOne").mockResolvedValue(null);

    await expect(
      contentService.updateContentField("1", "field1", "type3")
    ).rejects.toThrow(new HttpError(404, "Content not found"));
  });
});

describe("deleteContentField", () => {
  it("should delete a content field", async () => {
    const mockResolvedValueFindOne = {
      id: "1",
      name: "name",
      fields: {
        field1: "type1",
        field2: "type2",
      },
      entries: {},
    };

    jest.spyOn(Content, "findOne").mockResolvedValue(mockResolvedValueFindOne);

    const mockResolvedValueUpdate = [1];

    jest.spyOn(Content, "update").mockResolvedValue(mockResolvedValueUpdate);

    const content = await contentService.deleteContentField("1", "field1");

    expect(content).toEqual(mockResolvedValueUpdate);
  });

  it("should throw an error if the content does not exist", async () => {
    jest.spyOn(Content, "findOne").mockResolvedValue(null);

    await expect(
      contentService.deleteContentField("1", "field1")
    ).rejects.toThrow(new HttpError(404, "Content not found"));
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

    jest.spyOn(Content, "findAll").mockResolvedValue(mockResolvedValue);

    const contents = await contentService.getContents();

    expect(contents).toEqual(mockResolvedValue);
  });
});

describe("creteContentEntry", () => {
  it("should create a content entry", async () => {
    const mockResolvedValueFindOne = {
      id: "1",
      name: "name",
      fields: {
        field1: "type1",
        field2: "type2",
      },
      entries: {},
    };

    jest.spyOn(Content, "findOne").mockResolvedValue(mockResolvedValueFindOne);

    const mockResolvedValueUpdate = {
      entries: {
        1: {
          field1: "value1",
          field2: "value2",
        },
      },
    };

    jest.spyOn(Content, "update").mockResolvedValue(mockResolvedValueUpdate);

    const updatedContent = await contentService.createContentEntry("1", {
      field1: "value1",
      field2: "value2",
    });

    expect(updatedContent).toEqual(mockResolvedValueUpdate);
  });

  it("should throw an error if the content does not exist", async () => {
    jest.spyOn(Content, "findOne").mockResolvedValue(null);

    await expect(
      contentService.createContentEntry("1", {
        field1: "value1",
        field2: "value2",
      })
    ).rejects.toThrow(new HttpError(404, "Content not found"));
  });
});

describe("updateContentEntry", () => {
  it("should update a content entry", async () => {
    const mockResolvedValueFindOne = {
      id: "1",
      name: "name",
      fields: {
        field1: "type1",
        field2: "type2",
      },
      entries: {
        1: {
          field1: "value1",
          field2: "value2",
        },
      },
    };

    jest.spyOn(Content, "findOne").mockResolvedValue(mockResolvedValueFindOne);

    const mockResolvedValueUpdate = {
      entries: {
        1: {
          field1: "value1",
          field2: "value2",
        },
      },
    };

    jest.spyOn(Content, "update").mockResolvedValue(mockResolvedValueUpdate);

    const updatedContent = await contentService.updateContentEntry("1", "1", {
      field1: "value1",
      field2: "value2",
    });

    expect(updatedContent).toEqual(mockResolvedValueUpdate);
  });

  it("should throw an error if the content does not exist", async () => {
    jest.spyOn(Content, "findOne").mockResolvedValue(null);

    await expect(
      contentService.updateContentEntry("1", "1", {
        field1: "value1",
        field2: "value2",
      })
    ).rejects.toThrow(new HttpError(404, "Content not found"));
  });
});

describe("deleteContentEntry", () => {
  it("should delete the content entry", async () => {
    const mockResolvedValueFindOne = {
      id: "1",
      name: "name",
      fields: {
        field1: "type1",
        field2: "type2",
      },
      entries: {
        1: {
          field1: "value1",
          field2: "value2",
        },
      },
    };

    jest.spyOn(Content, "findOne").mockResolvedValue(mockResolvedValueFindOne);

    const mockResolvedValueUpdate = {
      entries: {},
    };

    jest.spyOn(Content, "update").mockResolvedValue(mockResolvedValueUpdate);

    const updatedContent = await contentService.deleteContentEntry("1", "1");

    expect(updatedContent).toEqual(mockResolvedValueUpdate);
  });

  it("should throw an error if the content does not exist", async () => {
    jest.spyOn(Content, "findOne").mockResolvedValue(null);

    await expect(contentService.deleteContentEntry("1", "1")).rejects.toThrow(
      new HttpError(404, "Content not found")
    );
  });
});
