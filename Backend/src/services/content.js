const { Content } = require("../../database/models/index");
const HttpError = require("../utils/errors/HttpError");
const { v4: uuidv4 } = require("uuid");

const createContent = async ({ name, fields = {}, entries = {} }) => {
  const content = await Content.create({ name, fields, entries });

  return content;
};

const createContentField = async (contentId, field) => {
  const content = await Content.findOne({
    where: {
      id: contentId,
    },
  });

  if (!content) {
    throw new HttpError(404, "Content not found");
  }

  const updatedContent = await Content.update(
    {
      fields: {
        ...content.fields,
        [field]: "string",
      },
    },
    {
      where: {
        id: contentId,
      },
    }
  );

  if (content.entries) {
    const updatedEntries = Object.keys(content.entries).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          ...content.entries[key],
          [field]: "",
        },
      }),
      {}
    );

    const updatedContent = await Content.update(
      {
        entries: updatedEntries,
      },
      {
        where: {
          id: contentId,
        },
      }
    );

    return updatedContent;
  }

  return updatedContent;
};

const updateContentField = async (contentId, prevFieldValue, newFieldValue) => {
  const content = await Content.findOne({
    where: {
      id: contentId,
    },
  });

  if (!content) {
    throw new HttpError(404, "Content not found");
  }

  const fields = Object.keys(content.fields).reduce((acc, key) => {
    if (key === prevFieldValue) {
      acc[newFieldValue] = content.fields[key];
    } else {
      acc[key] = content.fields[key];
    }

    return acc;
  }, {});

  const updatedContent = await Content.update(
    {
      fields,
    },
    {
      where: {
        id: contentId,
      },
    }
  );

  return updatedContent;
};

const deleteContentField = async (contentId, field) => {
  const content = await Content.findOne({
    where: {
      id: contentId,
    },
  });

  if (!content) {
    throw new HttpError(404, "Content not found");
  }

  const fields = Object.keys(content.fields).reduce((acc, key) => {
    if (key !== field) {
      acc[key] = content.fields[key];
    }

    return acc;
  }, {});

  const updatedContent = await Content.update(
    {
      fields,
    },
    {
      where: {
        id: contentId,
      },
    }
  );

  // if (content.entries) {
  //   const updatedEntries = Object.keys(content.entries).reduce(
  //     (acc, key) => ({
  //       ...acc,

  //       [key]: Object.keys(content.entries[key]).reduce((acc, key2) => {
  //         if (key2 !== field) {
  //           acc[key2] = content.entries[key][key2];
  //         }

  //         return acc;
  //       }, {}),
  //     }),
  //     {}
  //   );

  //   const updatedContent = await Content.update(
  //     {
  //       entries: updatedEntries,
  //     },
  //     {
  //       where: {
  //         id: contentId,
  //       },
  //     }
  //   );

  //   return updatedContent;
  // }

  return updatedContent;
};

const getContents = async () => {
  const contents = await Content.findAll();

  return contents;
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

  const updatedContent = await Content.update(
    {
      entries: {
        ...content.entries,
        [id]: entry,
      },
    },
    {
      where: {
        id: contentId,
      },
    }
  );

  return updatedContent;
};

const updateContentEntry = async (contentId, entryId, field, newEntryValue) => {
  const content = await Content.findOne({
    where: {
      id: contentId,
    },
  });

  if (!content) {
    throw new HttpError(404, "Content not found");
  }

  const entries = Object.keys(content.entries).reduce((acc, key) => {
    if (key === entryId) {
      acc[key] = {
        ...content.entries[key],
        [field]: newEntryValue,
      };
    } else {
      acc[key] = content.entries[key];
    }

    return acc;
  }, {});

  const updatedContent = await Content.update(
    {
      entries,
    },
    {
      where: {
        id: contentId,
      },
    }
  );

  return updatedContent;
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

  console.log("entries", entries);

  const updatedContent = await Content.update(
    {
      entries,
    },
    {
      where: {
        id: contentId,
      },
    }
  );

  console.log("updatedContent", updatedContent);

  return updatedContent;
};

module.exports = {
  createContent,
  createContentField,
  updateContentField,
  deleteContentField,
  getContents,
  createContentEntry,
  updateContentEntry,
  deleteContentEntry,
};
