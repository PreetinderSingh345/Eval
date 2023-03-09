const { Content } = require("../../database/models/index");
const HttpError = require("../utils/errors/HttpError");
const { v4: uuidv4 } = require("uuid");

const createContent = async ({ name, fields, entries = {} }) => {
  const content = await Content.create({ name, fields, entries });

  return content;
};

const getContents = async () => {
  const contents = await Content.findAll();

  return contents;
};

const getContentFields = async (contentId) => {
  const content = await Content.findOne({
    where: {
      id: contentId,
    },
  });

  if (!content) {
    throw new HttpError(404, "Content not found");
  }

  return content.fields;
};

const createContentEntry = async (contentId, entry) => {
  const content = await Content.findOne({
    where: {
      id: contentId,
    },
  });

  if (!content) {
    throw new HttpError(404, "Content not found");
  }

  const id = uuidv4();

  const updatedContent = await content.update({
    entries: {
      ...content.entries,
      [id]: entry,
    },
  });

  return updatedContent;
};

const getContentEntries = async (contentId) => {
  const content = await Content.findOne({
    where: {
      id: contentId,
    },
  });

  if (!content) {
    throw new HttpError(404, "Content not found");
  }

  return content.entries;
};

const deleteContentEntry = async (contentId, entryId) => {
  const content = await Content.findOne({
    where: {
      id: contentId,
    },
  });

  if (!content) {
    throw new HttpError(404, "Content not found");
  }

  const entries = Object.keys(content.entries).reduce((acc, key) => {
    if (key !== entryId) {
      acc[key] = content.entries[key];
    }

    return acc;
  }, {});

  const updatedContent = await content.update({
    entries,
  });

  return updatedContent;
};

module.exports = {
  createContent,
  getContents,
  getContentFields,
  createContentEntry,
  getContentEntries,
  deleteContentEntry,
};
