const contentSchema = require('../schemas/joiContent');
const HttpError = require('../utils/errors/HttpError');

const createContentValidator = (req, res, next) => {
	try {
		const { name, fields } = req.body;

		const { error } = contentSchema.createContentSchema.validate({
			name,
			fields,
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

const getContentFieldsValidator = (req, res, next) => {
	try {
		const { contentId } = req.params;

		const { error } = contentSchema.getContentFieldsSchema.validate({
			contentId,
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

const getContentEntriesValidator = (req, res, next) => {
	try {
		const { contentId } = req.params;

		const { error } = contentSchema.getContentEntriesSchema.validate({
			contentId,
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
	createContentEntryValidator,
	getContentFieldsValidator,
	getContentEntriesValidator,
	deleteContentEntryValidator,
};
