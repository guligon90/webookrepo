import { ISBNHandler } from '../isbn';

it('checks the validity of various ISBNs', async () => {
	const correct = 9781861972712;
	const incorrect = 9781861973712;
	const asString = '9781861972712';

	expect(ISBNHandler.isValid(correct)).toBeTruthy();
	expect(ISBNHandler.isValid(incorrect)).toBeFalsy();
	expect(ISBNHandler.isValid(asString)).toBeTruthy();
});

it('checks the validity of an ISBN with more than 13 digits', async () => {
	const isbn = 97818619727123455;

	expect(ISBNHandler.isValid(isbn)).toBeFalsy();
});

it('checks the validity of an ISBN with less than 13 digits', async () => {
	const isbn = 978186197;

	expect(ISBNHandler.isValid(isbn)).toBeFalsy();
});

it('checks the validity of an ISBN, when the latter is alphanumeric', async () => {
	const isbn = 'whatever';

	expect(ISBNHandler.isValid(isbn)).toBeFalsy();
});
