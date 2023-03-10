const express = require("express");
const contentController = require("../controllers/content");
const contentValidator = require("../middlewares/contentValidator");
const tokenValidator = require("../middlewares/tokenValidator");

const contentRouter = express.Router();

contentRouter.get("/contents", tokenValidator, contentController.getContents);

contentRouter.post(
  "/createContent",
  tokenValidator,
  // contentValidator.createContentValidator,
  contentController.createContent
);

contentRouter.post(
  "/createContentField/:contentId",
  tokenValidator,
  contentController.createContentField
);

contentRouter.put(
  "/updateContentField/:contentId",
  tokenValidator,
  contentController.updateContentField
);

contentRouter.delete(
  "/deleteContentField/:contentId/:field",
  tokenValidator,
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
  contentController.updateContentEntry
);

contentRouter.delete(
  "/deleteContentEntry/:contentId/:entryId",
  tokenValidator,
  contentValidator.deleteContentEntryValidator,
  contentController.deleteContentEntry
);

module.exports = contentRouter;
