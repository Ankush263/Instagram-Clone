const express = require('express');

const {
	createUser,
	getAllUser,
	getOneUser,
	updateUser,
	deleteUser,
	updateMe,
	getMe,
	deleteMe,
	uploadImg,
	updateAvater,
	deleteAvater,
} = require('../controllers/userControllers');

const {
	signup,
	login,
	logout,
	protect,
} = require('../controllers/authControllers');

const { cleanCacheUser } = require('../redis/utils/cache');

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').get(logout);

router.use(protect);

router.route('/updateAvater').patch(cleanCacheUser, uploadImg, updateAvater);
router.route('/deleteAvater').patch(cleanCacheUser, deleteAvater);
router.route('/updateMe').patch(cleanCacheUser, updateMe);
router.route('/me').get(getMe, getOneUser);
router.route('/deleteMe').delete(cleanCacheUser, deleteMe);

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getOneUser).patch(updateUser).delete(deleteUser);

module.exports = router;
