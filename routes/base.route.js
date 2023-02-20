const express = require('express');

const homeController = require('../controllers/home.controller');

const router = express.Router();

router.get('/', homeController.backHome);

router.get('/401', homeController.errorPage_401);

router.get('/403', homeController.errorPage_403);

router.get('/500', homeController.errorPage_500);

module.exports = router;