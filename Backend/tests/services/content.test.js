const contentService = require("../../src/services/content");
const { Content } = require("../../database/models");
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

    jest.spyOn(Content, "create").mockResolvedValue(mockResolvedValue);

    const content = await contentService.createContent("name", {
      field1: "type1",
      field2: "type2",
    });

    expect(content).toEqual(mockResolvedValue);
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

describe("getContentsFields", () => {
  it("should get all the fields of the content", async () => {
    const mockResolvedValue = {
      fields: {
        firstName: "string",
        lastName: "string,",
      },
    };

    jest.spyOn(Content, "findOne").mockResolvedValue(mockResolvedValue);

    const fields = await contentService.getContentFields("1");

    expect(fields).toEqual(mockResolvedValue.fields);
  });

  it("should throw an error if the content does not exist", async () => {
    jest.spyOn(Content, "findOne").mockResolvedValue(null);

    await expect(contentService.getContentFields("1")).rejects.toThrow(
      new HttpError(404, "Content not found")
    );
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

describe("getContentEntries", () => {
  it("should get all the entries of the content", async () => {
    const mockResolvedValue = {
      entries: {
        1: {
          field1: "value1",
          field2: "value2",
        },

        2: {
          field1: "value1",
          field2: "value2",
        },
      },
    };

    jest.spyOn(Content, "findOne").mockResolvedValue(mockResolvedValue);

    const entries = await contentService.getContentEntries("1");

    expect(entries).toEqual(mockResolvedValue.entries);
  });

  it("should throw an error if the content does not exist", async () => {
    jest.spyOn(Content, "findOne").mockResolvedValue(null);

    await expect(contentService.getContentEntries("1")).rejects.toThrow(
      new HttpError(404, "Content not found")
    );
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
