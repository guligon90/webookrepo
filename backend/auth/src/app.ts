import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@webookrepo/commonp';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
	signed: false, // JWT is already signed and encripted
	secure: process.env.NODE_ENV !== 'test' // Don't make HTTPS requests in test env
}));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
