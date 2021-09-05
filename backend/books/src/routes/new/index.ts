import express, { Request, Response } from 'express';

import { Book } from '../../models/book';
import validations from './validations';
import { requireAuth, validateRequest } from '@webookrepo/commonp';

const router = express.Router();

router.post(
	'/api/books',
	requireAuth,
	validations,
	validateRequest,
	async (req: Request, res: Response) => {

		const book = Book.build({
			...req.body,
			userId: req.currentUser!.id
		});
		await book.save();

		res.status(201).send(book);
	}
);

export { router as createBookRouter };
