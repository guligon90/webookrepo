import { CustomError } from './custom-error';

class NotAuthorizedError extends CustomError {
	statusCode = 401;
	private static defaultMessage = 'Not authorized';

	constructor(message: string = NotAuthorizedError.defaultMessage) {
		super(message);

		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}

	serializeErrors() {
		return [
			{ message: NotAuthorizedError.defaultMessage }
		];
	}
}

export { NotAuthorizedError };
