const User = require('../models/usersModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Post = require('../models/postModel');
const { uploadImage } = require('./s3bucket');
const { s3 } = require('./s3');

exports.createUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not defined! Please use /signup instead',
	});
};

exports.updateUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not defined! Please use /updateMe instead',
	});
};

exports.deleteUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not defined! Please use /deleteMe instead',
	});
};

exports.updateMe = catchAsync(async (req, res, next) => {
	if (req.body.password || req.body.passwordConfirm) {
		return next(
			new AppError(
				`This route is not for password update, Please use /updateMyPAssword.`,
				400
			)
		);
	}
	const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser,
		},
	});
});

exports.uploadImg = uploadImage.single('avater');

exports.updateAvater = catchAsync(async (req, res, next) => {
	const key = req.file.key;
	const url = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`;

	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		{ ...req.body, avater: url },
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser,
		},
	});
});

exports.deleteAvater = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	const parts = user.avater.split(
		`https://${process.env.BUCKET_NAME}.s3.amazonaws.com/`
	);
	const key = parts[1];

	const params = {
		Bucket: `${process.env.BUCKET_NAME}`,
		Key: key,
	};
	s3.deleteObject(params, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	});

	await User.findByIdAndUpdate(
		req.user.id,
		{ ...req.body, avater: null },
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		status: 'success',
		data: {
			user: null,
		},
	});
});

exports.getMe = (req, res, next) => {
	req.params.id = req.user.id;
	next();
};

exports.deleteMe = catchAsync(async (req, res, next) => {
	const postsToDelete = await Post.find({ user: req.user.id });
	await Promise.all(
		postsToDelete.map(async (post) => {
			await post.remove();
		})
	);
	await User.findByIdAndDelete(req.user.id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

exports.getAllUser = factory.getAll(User);
exports.getOneUser = factory.getOne(User, {
	path: 'posts followers followings tagged likedPosts',
});
