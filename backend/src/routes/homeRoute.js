'use strict';

const express        = require('express');
const router         = express.Router();
const homeController = require('../controllers/homeController');

// GET /api/home
router.get('/', homeController.getHome);

module.exports = router;
