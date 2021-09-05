import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}

	if (!process.env.MONGODB_URI) {
		throw new Error('MONGODB_URI must be defined');
	}

	try {
		await mongoose.connect(
			process.env.MONGODB_URI,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true
			}
		);

		console.log('Connected to MongoDB');
	} catch (err) {
		console.error(err);
	}

	app.listen(3000, () => {
		console.log('Listening on port 3000');
	});
};

start();
