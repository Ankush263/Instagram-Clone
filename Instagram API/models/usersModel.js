const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
		fullname: {
			type: String,
			required: [true, 'Must have a fullname'],
		},
		username: {
			type: String,
			unique: true,
			required: [true, 'Must have a username'],
		},
		bio: {
			type: String,
		},
		avater: {
			type: String,
		},
		postNum: {
			type: Number,
			default: 0,
		},
		followersNum: {
			type: Number,
			default: 0,
		},
		followingNum: {
			type: Number,
			default: 0,
		},
		phone: {
			type: String,
			required: [true, 'Must have a phone number'],
			unique: true,
			validate: [
				validator.isMobilePhone,
				'please provide a valid phone number',
			],
		},
		email: {
			type: String,
			required: [true, 'Must have an email'],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'please provide a valid email'],
		},
		password: {
			type: String,
			required: [true, 'please provide a password'],
			minlength: 8,
			select: false,
		},
		passwordResetToken: String,
		passwordResetExpires: Date,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password') || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;

	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimestamp < changedTimestamp;
	}
	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');
	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

userSchema.virtual('posts', {
	ref: 'Post',
	foreignField: 'user',
	localField: '_id',
});

userSchema.virtual('followers', {
	ref: 'Follow',
	foreignField: 'to',
	localField: '_id',
	justOne: false,
	options: {
		populate: { path: 'self', select: 'username avater' },
	},
});

userSchema.virtual('followings', {
	ref: 'Follow',
	foreignField: 'self',
	localField: '_id',
	justOne: false,
	options: {
		populate: { path: 'to', select: 'username avater' },
	},
});

userSchema.virtual('tagged', {
	ref: 'PostTag',
	foreignField: 'taggedPerson',
	localField: '_id',
	justOne: false,
});

userSchema.virtual('likedPosts', {
	ref: 'PostLike',
	foreignField: 'user',
	localField: '_id',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
