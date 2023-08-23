const express = require('express');
const { cleanCacheUser, cleanCachePost } = require('../redis/utils/cache');

const {
	createPost,
	getAllPost,
	getOnePost,
	updatePost,
	deletePost,
	checkOwner,
	getAllMyPosts,
	getPostsByUsers,
	getAllpostAndReels,
	uploadImg,
	deletePhoto,
} = require('../controllers/postControllers');

const { protect } = require('../controllers/authControllers');

const router = express.Router();

router.use(protect);

router.route('/postAndReels').get(getAllpostAndReels);
router.route('/myposts').get(getAllMyPosts);
router.route('/postByUser/:userId').get(getPostsByUsers);

router.route('/').get(getAllPost).post(cleanCacheUser, uploadImg, createPost);

router
	.route('/:id')
	.get(getOnePost)
	.patch(checkOwner, cleanCacheUser, cleanCachePost, updatePost)
	.delete(checkOwner, cleanCacheUser, cleanCachePost, deletePhoto, deletePost);

module.exports = router;
