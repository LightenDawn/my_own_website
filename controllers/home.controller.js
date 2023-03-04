const Article = require('../models/article.model');

async function backHome(req, res) {
  const articles = await Article.getAllArticles();
  res.render('base/home', {articles: articles});
}

async function detailArticle(req, res, next) {
  const articleId = req.params.id;
  try {
    const articleData = await Article.findArticleDetail(articleId);
    const userId = articleData.author._id.toString();
    res.render("users/articles/article_detail", {
      articleData: articleData,
      userId: userId,
    });
  } catch (error) {
    next(error);
    return;
  }
}

async function lifestyleArticle(req, res, next) {
  const lifestyleArticles = await Article.findSingleCategory('生活休閒');
  res.render('base/lifestyle', {lifestyleArticles:lifestyleArticles});
}

async function diaryArticle(req, res, next) {
  const lifestyleArticles = await Article.findSingleCategory('心情日誌');
  res.render('base/lifestyle', {lifestyleArticles:lifestyleArticles});
}

async function interestArticle(req, res, next) {
  const lifestyleArticles = await Article.findSingleCategory('興趣嗜好');
  res.render('base/lifestyle', {lifestyleArticles:lifestyleArticles});
}

async function creationArticle(req, res, next) {
  const lifestyleArticles = await Article.findSingleCategory('個人創作');
  res.render('base/lifestyle', {lifestyleArticles:lifestyleArticles});
}

async function othersArticle(req, res, next) {
  const lifestyleArticles = await Article.findSingleCategory('其他');
  res.render('base/lifestyle', {lifestyleArticles:lifestyleArticles});
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
  errorPage_500: errorPage_500,
  detailArticle: detailArticle,
  lifestyleArticle: lifestyleArticle,
  diaryArticle: diaryArticle,
  interestArticle: interestArticle,
  creationArticle: creationArticle,
  othersArticle: othersArticle
};