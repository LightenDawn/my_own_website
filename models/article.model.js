const db = require('../data/database');

class Article {
  constructor(title, category, content, author, date, image) {
    this.title = title;
    this.category = category;
    this.content = content;
    this.author = author;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("zh-TW", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    this.image = image;
    this.updateImageData();
  }

  static async findCategory() {
    const category = await db.getDb().collection('article_title').find({}).toArray();
    return category;
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
      author: 123456,
      date: new Date(),
      image: this.image
    };
    const article = await db.getDb().collection('articles').insertOne(articleData);
    return article;
  }
}

module.exports = Article;