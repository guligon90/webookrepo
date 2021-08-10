import { CustomError } from './custom-error';

class DatabaseConnectionError extends CustomError {
	statusCode = 500;
	reason = 'Failed to connect to the database.'

	constructor() {
		super('Failed to connect to the database.');

		// Only because I'm extending a built in class.
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors() {
		return [
			{ message: this.reason },
		];
	}
}

export { DatabaseConnectionError };
