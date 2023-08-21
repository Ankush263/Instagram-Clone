const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const catchAsync = require('../utils/catchAsync');

const s3 = new AWS.S3({
	credentials: {
		accessKeyId: `${process.env.ACCESSKEYID}`,
		secretAccessKey: `${process.env.SECRETACCESSKEY}`,
	},
	signatureVersion: 'v4',
	region: 'us-east-1',
});

exports.uploadImage = catchAsync(async (req, res, next) => {
	const key = `${req.user.id}/${uuid()}.jpeg`;

	s3.getSignedUrl(
		'putObject',
		{
			Bucket: 'instagram-clone-bucket-263',
			ContentType: 'image/jpeg',
			Key: key,
		},
		(err, url) => {
			res.send({ key, url });
			console.log(url);
		}
	);
	next();
});
