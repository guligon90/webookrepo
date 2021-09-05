import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { PasswordHandler } from '../services/password';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@webookrepo/commonp';

const router = express.Router();

router.post('/api/users/signin', [
	body('email')
		.isEmail()
		.withMessage('You must provide a valid email.'),
	body('password')
		.trim()
		.notEmpty()
		.withMessage('You must provide a password.')
],
validateRequest,
async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const existingUser = await User.findOne({ email });

	if (!existingUser) {
		throw new BadRequestError('Invalid credentials');
	}

	const passwordsMatch = await PasswordHandler.compare(
		existingUser.password,
		password
	);

	if (!passwordsMatch) {
		throw new BadRequestError('Invalid credentials');
	}

	// Generate JWT
	const userJwt = jwt.sign({
		id: existingUser.id,
		email: existingUser.email
	}, process.env.JWT_KEY!);

	// Store it on the session object
	req.session = {
		jwt: userJwt
	};

	res.status(200).send(existingUser);
});

export { router as signInRouter };
