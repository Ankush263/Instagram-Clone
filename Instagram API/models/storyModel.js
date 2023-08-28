const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now,
		},
		url: {
			type: String,
			required: [true, 'Must provide a post url'],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Must belongs to a user'],
		},
		likesNum: {
			type: Number,
			default: 0,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

storySchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

storySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: 'avater username',
	});

	next();
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
