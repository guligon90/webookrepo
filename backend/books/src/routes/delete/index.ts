import express, { Request, Response } from 'express';
import {
	requireAuth,
	NotFoundError,
	NotAuthorizedError
} from '@webookrepo/commonp';

import { Book } from '../../models/book';

const router = express.Router();

router.delete(
	'/api/books/:id',
	requireAuth,
	async (req: Request, res: Response) => {
		const id = req.params.id;
		const book = await Book.findById(id);

		if (!book) {
			throw new NotFoundError();
		}

		// You can't remove someone else's book
		if (book.id !== req.currentUser!.id) {
			throw new NotAuthorizedError();
		}

		await Book.deleteOne({ id });

		res.status(204);
	}
);

export { router as deleteBookRouter };
