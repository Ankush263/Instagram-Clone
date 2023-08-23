const Post = require('../models/postModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/usersModel');
const Reel = require('../models/reelModel');
const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

exports.checkOwner = catchAsync(async (req, res, next) => {
	const post = await Post.findById(req.params.id);
	if (post.user.id !== req.user.id) {
		return next(new AppError(`You are not owner of this post`, 404));
	}
	next();
});

exports.getAllpostAndReels = catchAsync(async (req, res, next) => {
	const post = await Post.find().select('url -user');
	const reel = await Reel.find().select('url -user');

	const allData = [];
	allData.push(post, reel);

	res.status(200).json({
		status: 'success',
		data: {
			data: allData,
		},
	});
});

exports.getAllMyPosts = catchAsync(async (req, res, next) => {
	const allMyPosts = await Post.find({ user: req.user.id });
	res.status(200).json({
		status: 'success',
		data: {
			data: allMyPosts,
		},
	});
});

exports.getPostsByUsers = catchAsync(async (req, res, next) => {
	const posts = await Post.find({ user: req.params.userId });

	res.status(201).json({
		status: 'success',
		data: {
			data: posts,
		},
	});
});

const s3 = new AWS.S3({
	credentials: {
		accessKeyId: `${process.env.ACCESSKEYID}`,
		secretAccessKey: `${process.env.SECRETACCESSKEY}`,
	},
	signatureVersion: 'v4',
	region: 'us-east-1',
});

const s3Storage = multerS3({
	s3: s3,
	bucket: `${process.env.BUCKET_NAME}`,
	contentType: multerS3.AUTO_CONTENT_TYPE,
	metadata: (req, file, cb) => {
		cb(null, { fieldname: file.fieldname });
	},
	key: (req, file, cb) => {
		const fileName = req.user.id + '/' + uuid() + '.jpeg';
		cb(null, fileName);
	},
});

function sanitizeFile(file, cb) {
	const fileExts = ['.png', '.jpg', '.jpeg'];

	const isAllowedExt = fileExts.includes(
		path.extname(file.originalname.toLowerCase())
	);
	const isAllowedMimeType = file.mimetype.startsWith('image/');
	if (isAllowedExt && isAllowedMimeType) {
		return cb(null, true); // no errors
	} else {
		cb('Error: File type not allowed!');
	}
}

const uploadImage = multer({
	storage: s3Storage,
	fileFilter: (req, file, callback) => {
		sanitizeFile(file, callback);
	},
	limits: {
		fileSize: 1024 * 1024 * 2,
	},
});

exports.deletePhoto = catchAsync(async (req, res, next) => {
	const post = await Post.findById(req.params.id);

	const parts = post.url.split(
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
	next();
});

exports.uploadImg = uploadImage.single('url');

exports.createPost = catchAsync(async (req, res, next) => {
	const userProfile = await User.findById(req.user.id);
	if (!userProfile) {
		return next(new AppError(`Please create an account`, 404));
	}
	if (!req.body.user) req.body.user = userProfile;

	const key = req.file.key;
	const url = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`;

	const doc = await Post.create({ ...req.body, url });
	res.status(201).json({
		status: 'success',
		data: {
			data: doc,
		},
	});
});

exports.getAllPost = factory.getAll(Post);
exports.getOnePost = factory.getOne(Post, { path: 'tags comments likes' });
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);
