import { Request, Response, NextFunction } from 'express';

import { NotAuthorizedError } from '../errors/not-authorized-error';

const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Blocks any request that don't have the currentUser
	// in the request structure
	if (!req.currentUser) {
		throw new NotAuthorizedError();
	}

	next();
};

export { requireAuth };
