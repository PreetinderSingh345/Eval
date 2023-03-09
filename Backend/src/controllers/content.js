const contentService = require('../services/content');
const HttpError = require('../utils/errors/HttpError');

const createContent = async (req, res) => {
	try {
		const { name, fields } = req.body;

		const content = await contentService.createContent({ name, fields });

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

const getContentFields = async (req, res) => {
	try {
		const { contentId } = req.params;

		const fields = await contentService.getContentFields(contentId);

		res.status(200).json(fields);
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

const getContentEntries = async (req, res) => {
	try {
		const { contentId } = req.params;

		const entries = await contentService.getContentEntries(contentId);

		res.status(200).json(entries);
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
	getContents,
	getContentFields,
	createContentEntry,
	getContentEntries,
	deleteContentEntry,
};
