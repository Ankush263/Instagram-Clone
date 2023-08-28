const express = require('express');
const router = express.Router();

const {
	createStory,
	deleteStory,
	setUser,
	checkOwner,
	getMyStories,
	getStoriesByUserId,
	getStoriesByFollows,
	uploadImg,
	deletePhoto,
	getAllStories,
	getAllStoriesByUsers,
} = require('../controllers/storyControllers');

const { protect } = require('../controllers/authControllers');

// Middleware to protect routes - Apply to all routes below
router.use(protect);

// Routes for story endpoints
router.route('/myStory').get(getMyStories);
router.route('/followersStories').get(getStoriesByFollows);
router.route('/storyByUsers').get(getAllStoriesByUsers);
router.route('/storyByUserId/:id').get(getStoriesByUserId);
router.route('/').post(setUser, uploadImg, createStory).get(getAllStories);
router.route('/:id').delete(checkOwner, deletePhoto, deleteStory);

module.exports = router;
