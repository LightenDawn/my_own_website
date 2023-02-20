const express = require('express');

const articleController = require('../controllers/article.controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get('/createYourArticle', articleController.createArticle);

router.post('/createYourArticle', imageUploadMiddleware,articleController.uploadArticle);

module.exports = router;