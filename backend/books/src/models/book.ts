import mongoose from 'mongoose';

interface BookDimensions {
	height: number;
	width: number;
	length: number;
}

interface BookAttrs {
	title: string;
	isbn: number;
	author: string;
	publisher: string;
	year: number;
	language: string;
	mass?: number;
	dimensions?: BookDimensions[];
	userId: string;
}

interface BookDoc extends mongoose.Document {
	title: string;
	isbn: number;
	author: string;
	publisher: string;
	year: number;
	language: string;
	mass?: number;
	dimensions?: BookDimensions[];
	userId: string;
}

interface BookModel extends mongoose.Model<BookDoc> {
	build(attrs: BookAttrs): BookDoc;
}

const BookDimensionsSchema = new mongoose.Schema(
	{
		height: {
			type: Number,
			gt: 0
		},
		length: {
			type: Number,
			gt: 0
		},
		width: {
			type: Number,
			gt: 0
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret._id;
			}
		}
	}
);

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		isbn: {
			type: Number,
			required: true
		},
		author: {
			type: String,
			required: true
		},
		publisher: {
			type: String,
			required: true
		},
		year: {
			type: Number,
			min: 1,
			required: true
		},
		language: {
			type: String,
			required: true
		},
		mass: {
			type: Number,
			gt: 0
		},
		dimensions: {
			type: BookDimensionsSchema
		},
		userId: {
			type: String,
			required: true
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			}
		}
	}
);

bookSchema.statics.build = (attrs: BookAttrs) => {
	return new Book(attrs);
};

const Book = mongoose.model<BookDoc, BookModel>('Book', bookSchema);

export { Book };
