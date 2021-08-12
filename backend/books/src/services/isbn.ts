const parseIntToArray = (intToParse: number): number[] => {
	// Converts an integer to an array of digits,
	// without string conversion
	const arrayOfDigits = [];
	let integer = Math.abs(intToParse);

	while (integer > 0) {
		arrayOfDigits.unshift(integer % 10);
		integer = Math.floor(integer / 10);
	}

	return arrayOfDigits;
};

class ISBNHandler {
	/**
	 * Implements the ISBN-13 digit verification algorithm.
	 * https://en.wikipedia.org/wiki/International_Standard_Book_Number
	 */

	private static sumOfProducts(digits: number[]): number {
		return digits
			// Calculating the product between a digit
			// and an alternating integer, defined by this relation
			.map(
				(digit, i) => digit * (2 + (-1) ** (i + 1))
			)
			// Sum all the products resulting from the map
			.reduce(
				(sum, product) => sum + product,
				0
			);
	}

	static isValid(isbn: number | string): boolean {
		if (typeof isbn === 'string') {
			try {
				isbn = parseInt(isbn, 10);
			} catch {
				return false;
			}
		}

		const digits = parseIntToArray(isbn);

		// TODO: This is only checks ISBN-13 format. Expand to ISBN-10
		if (digits.length !== 13) {
			return false;
		}

		const sumOfProducts = ISBNHandler.sumOfProducts(digits);

		// Check the modulo 10 division of the sum of products
		return (sumOfProducts % 10) === 0;
	}
}

export { ISBNHandler };
