const AWS = require('aws-sdk');

exports.s3 = new AWS.S3({
	credentials: {
		accessKeyId: `${process.env.ACCESSKEYID}`,
		secretAccessKey: `${process.env.SECRETACCESSKEY}`,
	},
	signatureVersion: 'v4',
	region: 'us-east-1',
});
