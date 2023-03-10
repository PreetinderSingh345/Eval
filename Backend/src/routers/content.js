const express = require("express");
const contentController = require("../controllers/content");
const contentValidator = require("../middlewares/contentValidator");
const tokenValidator = require("../middlewares/tokenValidator");

const contentRouter = express.Router();

contentRouter.get("/contents", tokenValidator, contentController.getContents);

contentRouter.post(
  "/createContent",
  tokenValidator,
  contentValidator.createContentValidator,
  contentController.createContent
);

contentRouter.post(
  "/createContentField/:contentId",
  tokenValidator,
  contentValidator.createContentFieldValidator,
  contentController.createContentField
);

contentRouter.put(
  "/updateContentField/:contentId",
  tokenValidator,
  contentValidator.updateContentFieldValidator,
  contentController.updateContentField
);

contentRouter.delete(
  "/deleteContentField/:contentId/:field",
  tokenValidator,
  contentValidator.deleteContentFieldValidator,
  contentController.deleteContentField
);

contentRouter.post(
  "/createContentEntry/:contentId",
  tokenValidator,
  contentValidator.createContentEntryValidator,
  contentController.createContentEntry
);

contentRouter.put(
  "/updateContentEntry/:contentId/:entryId",
  tokenValidator,
  contentValidator.updateContentEntryValidator,
  contentController.updateContentEntry
);

contentRouter.delete(
  "/deleteContentEntry/:contentId/:entryId",
  tokenValidator,
  contentValidator.deleteContentEntryValidator,
  contentController.deleteContentEntry
);

module.exports = contentRouter;
