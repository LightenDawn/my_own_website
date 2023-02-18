function createArticle(req, res) {
  res.render('users/articles/create');
}

module.exports = {
  createArticle: createArticle
};