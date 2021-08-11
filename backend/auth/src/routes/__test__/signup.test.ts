import request from 'supertest';

import { app } from '../../app';

it('returns a 201 on successfull signup', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201);
});

it('returns a 400 for an invalid email', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'foo',
			password: 'password'
		})
		.expect(400);
});

it('returns a 400 for an invalid pasword', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'thisPasswordIsReallyLongIndeed'
		})
		.expect(400);
});

it('returns a 400 for a payload missing email or password', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com'
		})
		.expect(400);

	await request(app)
		.post('/api/users/signup')
		.send({
			password: 'password'
		})
		.expect(400);
});

it('disallows duplicate emails', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201);

	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(400);
});

it('sets a cookie afte successfull signup', async () => {
	const response = await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password'
		})
		.expect(201);

	expect(response.get('Set-Cookie')).toBeDefined();
});
