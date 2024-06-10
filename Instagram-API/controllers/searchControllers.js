const catchAsync = require('../utils/catchAsync');
const User = require('../models/usersModel');

exports.search = catchAsync(async (req, res, next) => {
	const doc = await User.find({
		$or: [
			{ username: { $regex: '.*' + req.query.name + '.*', $options: 'i' } },
			{ fullname: { $regex: '.*' + req.query.name + '.*', $options: 'i' } },
		],
	});

	res.status(201).json({
		status: 'success',
		data: {
			data: doc,
		},
	});
});
