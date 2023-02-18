const express = require('express');

const articleController = require('../controllers/article.controller');

const router = express.Router();

router.get('/createYourArticle', articleController.createArticle);

module.exports = router;