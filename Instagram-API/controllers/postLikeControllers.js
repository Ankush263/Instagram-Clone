const PostLike = require('../models/postLikeModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/usersModel');
const client = require('../redis/client');
const { postKey, allPostKey, postLikesKey } = require('../redis/utils/keys');

exports.setUser = catchAsync(async (req, res, next) => {
	const userProfile = await User.findById(req.user.id);
	if (!userProfile) {
		return next(new AppError(`Please create an account`, 404));
	}
	if (!req.body.user) req.body.user = userProfile;
	next();
});

exports.check = catchAsync(async (req, res, next) => {
	const existingLike = await PostLike.findOne({
		user: req.user.id,
		post: req.body.post,
	});
	if (existingLike) {
		return next(new AppError('You already liked this post', 404));
	}
	next();
});

exports.deleteLike = catchAsync(async (req, res, next) => {
	const like = await PostLike.findById(req.params.id);
	if (!like) {
		return next(new AppError('No document found with that Id', 404));
	}

	if (like.post) {
		await client.HDEL(allPostKey(), postKey(like.post));
	}

	const doc = await PostLike.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: 'success',
		data: null,
	});
});

exports.createLikes = factory.createOne(PostLike);

// exports.createLikes = catchAsync(async (req, res, next) => {
// 	const userId = req.user.id;
// 	const postId = req.body.post;
// 	const insertLike = await client.PFADD(postLikesKey(postId), userId);

// 	if (!insertLike) {
// 		await client.DEL(postLikesKey(postId));
// 		return res.status(201).json({
// 			status: 'success',
// 			data: {
// 				data: 'deleted',
// 			},
// 		});
// 	}

// 	res.status(201).json({
// 		status: 'success',
// 		data: {
// 			data: 'created',
// 		},
// 	});
// });

// exports.showNumberOfLikes = catchAsync(async (req, res, next) => {
// 	const postId = req.params.id;
// 	const key = postLikesKey(postId);
// 	const likeNumber = await client.PFCOUNT(key);

// 	res.status(201).json({
// 		status: 'success',
// 		data: {
// 			data: likeNumber,
// 		},
// 	});
// });
