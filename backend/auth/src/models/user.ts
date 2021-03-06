import mongoose from 'mongoose';

import { PasswordHandler } from '../services/password';

// An interface that describes the properties that
// are required to create a user
interface UserAttrs {
	email: string;
	password: string;
}

// An interface that describes what a User model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties what a
// User document has
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema<UserDoc>({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}, {
	toJSON: {
		transform(doc, ret) {
			ret.id = ret._id;

			delete ret._id;
			delete ret.password; // Removes the password from the users' JSON representation
			delete ret.__v; // Removes the version key
		}
	}
});

// This wrapper function provides better type checking than new User()
userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

userSchema.pre('save', async function(done) {
	if (this.isModified('password')) {
		const hashed = await PasswordHandler.toHash(this.get('password'));

		this.set('password', hashed);
	}
	done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
