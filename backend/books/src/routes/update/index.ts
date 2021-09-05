import express, { Request, Response } from 'express';
import {
	validateRequest,
	NotFoundError,
	requireAuth,
	NotAuthorizedError
} from '@webookrepo/commonp';

import validations from './validations';
import { Book } from '../../models/book';

const router = express.Router();

router.put(
	'/api/books/:id',
	requireAuth,
	validations,
	validateRequest,
	async (req: Request, res: Response) => {
		const book = await Book.findById(req.params.id);

		if (!book) {
			throw new NotFoundError();
		}

		// You can't update someone else's book
		if (book.userId !== req.currentUser!.id) {
			throw new NotAuthorizedError();
		}

		book.set({ ...req.body });
		await book.save();

		res.send(book);
	}
);

export { router as updateBookRouter };
