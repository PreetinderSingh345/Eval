const express = require("express");
const contentController = require("../controllers/content");
const contentValidator = require("../middlewares/contentValidator");
const tokenValidator = require("../middlewares/tokenValidator");

const contentRouter = express.Router();

contentRouter.post(
  "/createContent",
  tokenValidator,
  contentValidator.createContentValidator,
  contentController.createContent
);

contentRouter.post(
  "/createContentEntry/:contentId",
  tokenValidator,
  contentValidator.createContentEntryValidator,
  contentController.createContentEntry
);

contentRouter.get("/contents", tokenValidator, contentController.getContents);

contentRouter.get(
  "/contentFields/:contentId",
  tokenValidator,
  contentValidator.getContentFieldsValidator,
  contentController.getContentFields
);
contentRouter.get(
  "/contentEntries/:contentId",
  tokenValidator,
  contentValidator.getContentEntriesValidator,
  contentController.getContentEntries
);

contentRouter.delete(
  "/deleteContentEntry/:contentId/:entryId",
  tokenValidator,
  contentValidator.deleteContentEntryValidator,
  contentController.deleteContentEntry
);

module.exports = contentRouter;
