const mongoose = require('mongoose');
const Reel = require('./reelModel');

const reelLikeSchema = new mongoose.Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		reel: {
			type: mongoose.Schema.ObjectId,
			ref: 'Reel',
			required: [true, 'likes must belongs on a reel'],
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

reelLikeSchema.statics.calcLikesNumberOfReels = async function (reelId) {
	const stats = await this.aggregate([
		{
			$match: { reel: reelId?._id },
		},
		{
			$group: {
				_id: '$reel',
				nLikes: { $sum: 1 },
			},
		},
	]);

	if (stats.length > 0) {
		await Reel.findByIdAndUpdate(reelId?._id, {
			likesNum: stats[0].nLikes,
		});
	} else {
		await Reel.findByIdAndUpdate(reelId?._id, {
			likesNum: 0,
		});
	}
};

reelLikeSchema.post('save', function () {
	this.constructor.calcLikesNumberOfReels(this.reel);
});

reelLikeSchema.pre(/^findOneAnd/, async function (next) {
	this.r = await this.findOne();
	next();
});

reelLikeSchema.post(/^findOneAnd/, async function () {
	await this.r?.constructor.calcLikesNumberOfReels(this.r.reel);
});

const ReelLike = mongoose.model('Like', reelLikeSchema);

module.exports = ReelLike;
