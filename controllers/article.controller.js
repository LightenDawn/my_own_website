const Article = require('../models/article.model');

async function createArticle(req, res) {
  const categories = await Article.findCategory();

  res.render('users/articles/create', { categories: categories });
}

function uploadArticle(req, res) {
  const getting = req.body;
  const article = new Article(getting.title, getting.myCategory, getting.content, '', '', req.file.filename);
  article.save();
  res.redirect('/');
}

module.exports = {
  createArticle: createArticle,
  uploadArticle: uploadArticle
};