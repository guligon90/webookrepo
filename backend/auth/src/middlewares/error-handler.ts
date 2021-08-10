import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../errors/custom-error';

const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof CustomError) {
		return res
			.status(error.statusCode)
			.send({ errors: error.serializeErrors() });
	}

	res.status(500).send({
		errors: [
			{ message: 'Unhandled exception' }
		]
	});
};

export { errorHandler };
