import { body } from 'express-validator';

const validations = [
	body('title')
		.not()
		.isEmpty()
		.withMessage('Title is required'),
	body('isbn')
		.not()
		.isEmpty()
		.isInt()
		.isLength({ min: 13, max: 13 })
		.withMessage('ISBN must be informed as a 13-digit positive integer'),
	body('author')
		.not()
		.isEmpty()
		.withMessage('Author is required'),
	body('publisher')
		.not()
		.isEmpty()
		.withMessage('Publisher is required'),
	body('year')
		.not()
		.isEmpty()
		.isInt({ min: 1 })
		.withMessage('Year must be a positive integer'),
	body('language')
		.not()
		.isEmpty()
		.isLength({ min: 2, max: 4 })
		.withMessage('Language code must have between 2 and 4 characters'),
	body('mass')
		.optional()
		.isFloat({ gt: 0 })
		.withMessage('The book\'s mass must be a positive number'),
	body('dimensions')
		.optional()
		.isObject()
		.withMessage('You must inform all the dimensions in centimeters'),
	body('dimensions.*')
		.isFloat({ gt: 0 })
		.withMessage('The individual dimension must be a positive number')
];

export default validations;
