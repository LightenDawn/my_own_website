const Article = require('../models/article.model');
const User = require('../models/user.model');

async function createArticle(req, res) {
  const categories = await Article.findCategory();
  
  res.render('users/articles/createArticle', { categories: categories });
}

async function uploadArticle(req, res) {
  const userId = res.locals.uid;
  const user = await User.findUser(userId);
  let imageFile;
  
  if (!req.file){
    imageFile = '';
  } else {
    imageFile = req.file.filename;
  }

  if (!user) {
    res.status(500).render('shared/500');
    return;
  }

  const article = new Article({
    ...req.body,
    image: imageFile,
    author: user,
    date: new Date()
  });
  
  article.save();
  res.redirect('/');
}

module.exports = {
  createArticle: createArticle,
  uploadArticle: uploadArticle
};