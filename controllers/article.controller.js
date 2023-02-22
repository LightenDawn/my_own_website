const Article = require("../models/article.model");
const User = require("../models/user.model");
// 防止cross-site scripting
const xss = require("xss");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");
const { findUser } = require("../models/user.model");

async function createArticle(req, res, next) {
  let categories;
  try {
    categories = await Article.findCategory();
  } catch (error) {
    next(error);
    return;
  }

  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      title: "",
      content: "",
    };
  }

  res.render("users/articles/createArticle", {
    sessionData: sessionData,
    categories: categories,
  });
}

async function uploadArticle(req, res) {
  if (validation.checkEmpty(req.body.title)) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "標題不可為空, 請輸入適當的標題名稱",
        ...req.body,
      },
      function () {
        res.redirect("/article/createYourArticle");
      }
    );
    return;
  }

  if (validation.checkEmpty(req.body.content)) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "內容不可為空, 請輸入欲分享的內容",
        ...req.body,
      },
      function () {
        res.redirect("/article/createYourArticle");
      }
    );
    return;
  }

  const userId = res.locals.uid;
  const user = await User.findUser(userId);
  let imageFile;

  if (!req.file) {
    imageFile = "default.jpg";
  } else {
    imageFile = req.file.filename;
  }

  if (!user) {
    res.status(500).render("shared/500");
    return;
  }

  let article = new Article({
    ...req.body,
    image: imageFile,
    author: user,
    date: new Date(),
  });

  let title = xss(article.title);
  let content = xss(article.content);
  article.content = content;
  article.title = title;

  article.save();
  res.redirect("/");
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

async function deleteArticle(req, res, next) {
  const id = req.params.id;

  try {
    await Article.deleteArticle(id);
    res.redirect("/");
  } catch (error) {
    next(error);
    return;
  }
}

async function updateArticle(req, res, next) {
  let categories;
  try {
    categories = await Article.findCategory();
  } catch (error) {
    next(error);
    return;
  }

  try {
    const articleData = await Article.findArticleDetail(req.params.id);
    const articleTitle = await Article.findArticleTitle(articleData.category);
    res.render("users/articles/updateArticle", {
      categories: categories,
      articleData: articleData,
      articleTitle: articleTitle,
    });
  } catch (error) {
    next(error);
    return;
  }
}

async function updatingArticle(req, res, next) {
  let article;
  try {
    const user = await findUser(req.session.uid);
    article = new Article({
      ...req.body,
      author: user,
      date: new Date(),
      _id: req.params.id,
    });
  } catch (error) {
    next(error);
    return;
  }

  if (req.file) {
    article.replaceImage(req.file.filename);
  }

  try {
    await article.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/");
}

async function myAllArticles(req, res, next) {
  try {
    const articles = await Article.getMyAllArticles(req.session.uid);
    res.render('users/articles/my_articles', { articles: articles });
  } catch (error) {
    next(error);
    return;
  }
}

module.exports = {
  createArticle: createArticle,
  uploadArticle: uploadArticle,
  detailArticle: detailArticle,
  deleteArticle: deleteArticle,
  updateArticle: updateArticle,
  updatingArticle: updatingArticle,
  myAllArticles: myAllArticles,
};
