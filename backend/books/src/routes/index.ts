import express, { Request, Response } from 'express';

import { Book } from '../models/book';
import { requireAuth } from '@webookrepo/commonp';

const router = express.Router();

router.get(
	'/api/books',
	requireAuth,
	async (req: Request, res: Response) => {
		const books = await Book.find({});

		res.send(books);
});

export { router as indexBookRouter };
