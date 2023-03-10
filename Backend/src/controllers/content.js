const contentService = require("../services/content");
const HttpError = require("../utils/errors/HttpError");

const createContent = async (req, res) => {
  try {
    const { name } = req.body;

    const content = await contentService.createContent({ name });

    res.status(200).json(content);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const createContentField = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { field } = req.body;

    const content = await contentService.createContentField(contentId, field);

    res.status(200).json(content);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updateContentField = async (req, res) => {
  try {
    const { contentId } = req.params;
    const { prevFieldValue, newFieldValue } = req.body;

    const content = await contentService.updateContentField(
      contentId,
      prevFieldValue,
      newFieldValue
    );

    res.status(200).json(content);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const deleteContentField = async (req, res) => {
  try {
    const { contentId, field } = req.params;

    const content = await contentService.deleteContentField(contentId, field);

    res.status(200).json(content);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const getContents = async (req, res) => {
  try {
    const contents = await contentService.getContents();

    res.status(200).json(contents);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const createContentEntry = async (req, res) => {
  try {
    const { contentId } = req.params;
    const entry = req.body;

    const content = await contentService.createContentEntry(contentId, entry);

    res.status(200).json(content);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updateContentEntry = async (req, res) => {
  try {
    const { contentId, entryId } = req.params;
    const { field, newEntryValue } = req.body;

    const content = await contentService.updateContentEntry(
      contentId,
      entryId,
      field,
      newEntryValue
    );

    res.status(200).json(content);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const deleteContentEntry = async (req, res) => {
  try {
    const { contentId, entryId } = req.params;

    const content = await contentService.deleteContentEntry(contentId, entryId);

    res.status(200).json(content);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
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
