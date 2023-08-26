const express = require('express');

const {
	createPostTag,
	getAllPostTag,
	setUser,
	deletePostTag,
	checkOwner,
	checkPost,
	getAllPostTagByPost,
	createPostTagByUsername,
} = require('../controllers/postTagControllers');

const { protect } = require('../controllers/authControllers');
const { cleanCachePost } = require('../redis/utils/cache');

const router = express.Router();

router.use(protect);

router.route('/tagsByPost/:postId').get(getAllPostTagByPost);

router
	.route(`/username`)
	.post(setUser, checkPost, cleanCachePost, createPostTagByUsername);

router
	.route('/')
	.get(getAllPostTag)
	.post(setUser, checkPost, cleanCachePost, createPostTag);
router.route('/:id').delete(checkOwner, cleanCachePost, deletePostTag);

module.exports = router;
