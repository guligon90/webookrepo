import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError } from '@webookrepo/commonp';

import { Book } from '../../models/book';

const router = express.Router();

router.get(
	'/api/books/:id',
	requireAuth,
	async (req: Request, res: Response) => {
		const book = await Book.findById(req.params.id);

		if (!book) {
			throw new NotFoundError();
		}

		res.send(book);
	}
);

export { router as showBookRouter };
