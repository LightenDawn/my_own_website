const Article = require('../models/article.model');

async function backHome(req, res) {
  const articles = await Article.getAllArticles();
  res.render('base/home', {articles: articles});
}

function errorPage_401(req, res) {
  res.render('shared/401');
}

function errorPage_403(req, res) {
  res.render('shared/403');
}

function errorPage_500(req,res) {
  res.render('shared/500');
}

module.exports = {
  backHome: backHome,
  errorPage_401: errorPage_401,
  errorPage_403: errorPage_403,
  errorPage_500: errorPage_500
};