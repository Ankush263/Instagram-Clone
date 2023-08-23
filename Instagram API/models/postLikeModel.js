const mongoose = require('mongoose');
const Post = require('./postModel');

const postLikeSchema = new mongoose.Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		post: {
			type: mongoose.Schema.ObjectId,
			ref: 'Post',
			required: [true, 'must have a like on post'],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'likes must belongs to a user'],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

postLikeSchema.statics.calcLikesNumber = async function (postId) {
	const stats = await this.aggregate([
		{
			$match: { post: postId?._id },
		},
		{
			$group: {
				_id: '$post',
				nLikes: { $sum: 1 },
			},
		},
	]);

	if (stats.length > 0) {
		await Post.findByIdAndUpdate(postId?._id, {
			likesNum: stats[0].nLikes,
		});
	} else {
		await Post.findByIdAndUpdate(postId?._id, {
			likesNum: 0,
		});
	}
};

postLikeSchema.post('save', function () {
	this.constructor.calcLikesNumber(this.post);
});

postLikeSchema.pre(/^findOneAnd/, async function (next) {
	this.r = await this.findOne();
	next();
});

postLikeSchema.post(/^findOneAnd/, async function () {
	await this.r?.constructor.calcLikesNumber(this.r.post);
});

const PostLike = mongoose.model('PostLike', postLikeSchema);

module.exports = PostLike;
