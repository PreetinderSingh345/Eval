const joi = require("joi");

const createContentSchema = joi.object({
  name: joi.string().required(),
});

const createContentFieldSchema = joi.object({
  contentId: joi.string().required(),
  field: joi.string().required(),
});

const updateContentFieldSchema = joi.object({
  contentId: joi.string().required(),
  prevFieldValue: joi.string().required(),
  newFieldValue: joi.string().required(),
});

const deleteContentFieldSchema = joi.object({
  contentId: joi.string().required(),
  field: joi.string().required(),
});

const createContentEntrySchema = joi.object({
  contentId: joi.string().required(),
  entry: joi.object().pattern(joi.string(), joi.string()).required(),
});

const updateContentEntrySchema = joi.object({
  contentId: joi.string().required(),
  entryId: joi.string().required(),
  field: joi.string().required(),
  newEntryValue: joi.string().required(),
});

const deleteContentEntrySchema = joi.object({
  contentId: joi.string().required(),
  entryId: joi.string().required(),
});

module.exports = {
  createContentSchema,
  createContentFieldSchema,
  updateContentFieldSchema,
  deleteContentFieldSchema,
  createContentEntrySchema,
  updateContentEntrySchema,
  deleteContentEntrySchema,
};
