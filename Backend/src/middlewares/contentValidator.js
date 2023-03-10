const contentSchema = require("../schemas/joiContent");
const HttpError = require("../utils/errors/HttpError");

const createContentValidator = (req, res, next) => {
  try {
    const { name } = req.body;

    const { error } = contentSchema.createContentSchema.validate({ name });

    if (error) {
      throw new HttpError(400, error.details[0].message);
    }

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const createContentFieldValidator = (req, res, next) => {
  try {
    const { contentId } = req.params;
    const { field } = req.body;

    const { error } = contentSchema.createContentFieldSchema.validate({
      contentId,
      field,
    });

    if (error) {
      throw new HttpError(400, error.details[0].message);
    }

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updateContentFieldValidator = (req, res, next) => {
  try {
    const { contentId } = req.params;
    const { prevFieldValue, newFieldValue } = req.body;

    const { error } = contentSchema.updateContentFieldSchema.validate({
      contentId,
      prevFieldValue,
      newFieldValue,
    });

    if (error) {
      throw new HttpError(400, error.details[0].message);
    }

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const deleteContentFieldValidator = (req, res, next) => {
  try {
    const { contentId, field } = req.params;

    const { error } = contentSchema.deleteContentFieldSchema.validate({
      contentId,
      field,
    });

    if (error) {
      throw new HttpError(400, error.details[0].message);
    }

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const createContentEntryValidator = (req, res, next) => {
  try {
    const { contentId } = req.params;
    const entry = req.body;

    const { error } = contentSchema.createContentEntrySchema.validate({
      contentId,
      entry,
    });

    if (error) {
      throw new HttpError(400, error.details[0].message);
    }

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updateContentEntryValidator = (req, res, next) => {
  try {
    const { contentId, entryId } = req.params;
    const { field, newEntryValue } = req.body;

    const { error } = contentSchema.updateContentEntrySchema.validate({
      contentId,
      entryId,
      field,
      newEntryValue,
    });

    if (error) {
      throw new HttpError(400, error.details[0].message);
    }

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const deleteContentEntryValidator = (req, res, next) => {
  try {
    const { contentId, entryId } = req.params;

    const { error } = contentSchema.deleteContentEntrySchema.validate({
      contentId,
      entryId,
    });

    if (error) {
      throw new HttpError(400, error.details[0].message);
    }

    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

module.exports = {
  createContentValidator,
  createContentFieldValidator,
  updateContentFieldValidator,
  deleteContentFieldValidator,
  createContentEntryValidator,
  updateContentEntryValidator,
  deleteContentEntryValidator,
};
