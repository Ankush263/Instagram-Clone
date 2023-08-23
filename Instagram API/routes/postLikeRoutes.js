const express = require('express');

const {
	createLikes,
	deleteLike,
	setUser,
	check,
} = require('../controllers/postLikeControllers');
const { protect } = require('../controllers/authControllers');
const { cleanCachePost } = require('../redis/utils/cache');

const router = express.Router();

router.use(protect);

router.route('/').post(setUser, check, cleanCachePost, createLikes);
router.route('/:id').delete(deleteLike);

module.exports = router;
