const db = require("../data/database");
const mongodb = require("mongodb");

class Article {
  // constructor(title, category, content, author, date, image) {
  //   this.title = title;
  //   this.category = category;
  //   this.content = content;
  //   this.author = author;
  //   this.date = new Date(date);
  //   if (this.date) {
  //     this.formattedDate = this.date.toLocaleDateString("zh-TW", {
  //       weekday: "short",
  //       day: "numeric",
  //       month: "long",
  //       year: "numeric",
  //     });
  //   }
  //   this.image = image;
  //   this.imagePath = `upload_image/images/${image}`;
  //   this.imageURL = `/cover/images/images/${image}`;
  // }

  constructor(articleData) {
    this.title = articleData.title;
    this.category = articleData.myCategory;
    this.content = articleData.content;
    this.image = articleData.image;
    this.imagePath = `upload_image/images/${articleData.image}`;
    this.imageURL = `/cover/images/images/${articleData.image}`;
    this.author = articleData.author;
    this.date = articleData.date;
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("zh-TW", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    if (articleData._id) {
      this.id = articleData._id.toString();
    }
  }

  static async findCategory() {
    try {
      const category = await db
        .getDb()
        .collection("article_title")
        .find({})
        .toArray();
      return category;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  static async getAllArticles() {
    try {
      const articles = await db
        .getDb()
        .collection("articles")
        .find({})
        .toArray();
      return articles;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  static async getMyAllArticles(id) {
    try {
      const userId = new mongodb.ObjectId(id);
      const userArticles = await db
        .getDb()
        .collection("articles")
        .find({ "author._id": userId }).sort({"date": -1}).toArray();
      return userArticles;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  static async deleteArticle(id) {
    const articleId = new mongodb.ObjectId(id);
    if (!articleId) {
      console.log("沒有這篇文章");
      return;
    } else {
      return await db
        .getDb()
        .collection("articles")
        .deleteOne({ _id: articleId });
    }
  }

  static async findArticleDetail(id) {
    let articleId;
    try {
      articleId = new mongodb.ObjectId(id);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const articleData = await db
      .getDb()
      .collection("articles")
      .findOne({ _id: articleId });

    if (!articleData) {
      const error = new Error("沒有此篇文章存在");
      error.code = 404;
      throw error;
    }

    return articleData;
  }

  static async findArticleTitle(id) {
    try {
      const titleId = new mongodb.ObjectId(id);
      return await db
        .getDb()
        .collection("article_title")
        .findOne({ _id: titleId });
    } catch (error) {
      console.loe(error);
      return;
    }
  }

  updateImageData() {
    this.imagePath = `upload_images/images/${this.image}`;
    this.imageURL = `/cover/images/images/${this.image}`;
  }

  async save() {
    const articleData = {
      title: this.title,
      category: this.category,
      content: this.content,
      author: this.author,
      date: this.formattedDate,
      image: this.image,
      imageURL: this.imageURL,
      imagePath: this.imagePath,
    };

    if (this.id) {
      const articleId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete articleData.image;
        delete articleData.imageURL;
        delete articleData.imagePath;
      }

      await db
        .getDb()
        .collection("articles")
        .updateOne({ _id: articleId }, { $set: articleData });
    } else {
      try {
        const article = await db
          .getDb()
          .collection("articles")
          .insertOne(articleData);
        return article;
      } catch (error) {
        console.log(error);
        return;
      }
    }
  }

  async replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }
}

module.exports = Article;
