const db = require("../data/database");

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
  }

  static async findCategory() {
    const category = await db
      .getDb()
      .collection("article_title")
      .find({})
      .toArray();
    return category;
  }

  static async getAllArticles() {
    const articles = await db.getDb().collection("articles").find({}).toArray();
    return articles;
  }

  updateImageData() {
    this.imagePath = `upload_images/images/${this.image}`;
    this.imageURL = `/cover/images/${this.image}`;
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
    const article = await db
      .getDb()
      .collection("articles")
      .insertOne(articleData);
    return article;
  }
}

module.exports = Article;
