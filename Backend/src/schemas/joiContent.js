const joi = require("joi");

const createContentSchema = joi.object({
  name: joi.string().required(),
  fields: joi.object().pattern(joi.string(), joi.string()).required(),
});

const createContentEntrySchema = joi.object({
  contentId: joi.string().required(),
  entry: joi.object().pattern(joi.string(), joi.string()).required(),
});

const getContentFieldsSchema = joi.object({
  contentId: joi.string().required(),
});

const getContentEntriesSchema = joi.object({
  contentId: joi.string().required(),
});

const deleteContentEntrySchema = joi.object({
  contentId: joi.string().required(),
  entryId: joi.string().required(),
}); 

module.exports = {
  createContentSchema,
  createContentEntrySchema,
  getContentFieldsSchema,
  getContentEntriesSchema,
  deleteContentEntrySchema,
};
