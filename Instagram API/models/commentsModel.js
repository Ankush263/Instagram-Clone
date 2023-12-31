const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		updatedAt: {
			type: Date,
			default: Date.now(),
		},
		contents: {
			type: String,
			required: [true, 'Comment must have some content'],
		},
		post: {
			type: mongoose.Schema.ObjectId,
			ref: 'Post',
		},
		reel: {
			type: mongoose.Schema.ObjectId,
			ref: 'Reel',
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Comment must belongs to a user'],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

commentSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: 'avater username',
	});

	next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
