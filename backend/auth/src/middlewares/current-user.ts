import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
	id: string;
	email: string;
}

// Augmenting the Request type from express, in order
// to support the currentUser attribute, and make it
// of type UserPayload
declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// If the cookie is not set, go to the next middleware
	if (!req.session?.jwt) {
		return next();
	}

	try {
		const payload = jwt.verify(req.session.jwt, 'asdf') as UserPayload;
		req.currentUser = payload;
	} catch (error) {
		next();
	} finally {
		next();
	}
};

export { currentUser };
