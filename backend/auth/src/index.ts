import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
	signed: false, // JWT is already signed and encripted
	secure: true,
}))

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);

const start = async () => {
    try {
			await mongoose.connect('mongodb://auth-mongodb-srv:27017/authdb', {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			});

			console.log('Connected to MongoDB');
    }
    catch (error) {
			console.error(error);
    }

    app.listen('3000', () => {
			console.log('Listening on port 3000.');
    });
};

start();
