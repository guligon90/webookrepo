import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { app } from '../app';

// Interface NodeJS.Global augmentation for mocking signin
declare global {
	var signin: () => Promise<string[]>;
}

let mongo: any;

// Hook that creates a fake MongoDB server
// and opens a connection to it
beforeAll(async () => {
	process.env.JWT_KEY = 'asdfasdf';
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
});

// Hook that delete all the data in MongoDB
// before each test
beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (const collection of collections) {
		await collection.deleteMany({});
	}
});

// Hook that stops the fake MongoDB server
// and closes the connection after all tests had run
afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

// Mock the signin function globally, adding the
// cookie generation (for the current-user router handler test)
global.signin = async () => {
	const email = 'test@test.com';
	const password = 'password';

	const response = await request(app)
		.post('/api/users/signup')
		.send({
			email,
			password
		})
		.expect(201);

	const cookie = response.get('Set-Cookie');

	return cookie;
};
