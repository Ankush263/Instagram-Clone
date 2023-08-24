const express = require('express');

const {
	createLikes,
	setUser,
	deleteLike,
	check,
} = require('../controllers/postLikeControllers');
const { protect } = require('../controllers/authControllers');

const { cleanCachePost, cleanCacheUser } = require('../redis/utils/cache');

const router = express.Router();

router.use(protect);

router
	.route('/')
	.post(setUser, check, cleanCachePost, cleanCacheUser, createLikes);
router.route('/:id').delete(cleanCachePost, cleanCacheUser, deleteLike);

module.exports = router;
