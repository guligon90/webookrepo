import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';

import { errorHandler, NotFoundError, currentUser } from '@webookrepo/commonp';
import { createBookRouter } from './routes/new';
import { indexBookRouter } from './routes/index';
import { showBookRouter } from './routes/show';
import { updateBookRouter } from './routes/update';
import { deleteBookRouter } from './routes/delete';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
	})
);

app.use(currentUser);

app.use(createBookRouter);
app.use(deleteBookRouter);
app.use(indexBookRouter);
app.use(showBookRouter);
app.use(updateBookRouter);

app.all('*', async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
