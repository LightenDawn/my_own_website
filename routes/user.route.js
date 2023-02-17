const express = require('express');

const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/signup', userController.signup);

router.post('/signup', userController.userSign);

module.exports = router;