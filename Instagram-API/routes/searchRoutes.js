const express = require('express');

const { search } = require('../controllers/searchControllers');

const { protect } = require('../controllers/authControllers');

const router = express.Router();

router.use(protect);

router.route('/').get(search);

module.exports = router;
