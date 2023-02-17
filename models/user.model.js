const db = require("../data/database");
const bcrypt = require("bcrypt");

class User {
  constructor(username, nickname, email, confirmEmail, password) {
    this.username = username;
    this.nickname = nickname;
    this.email = email;
    this.confirmEmail = confirmEmail;
    this.password = password;
  }

  async save() {
    const hashPassword = await bcrypt.hash(this.password, 12);
    try {
      await db.getDb().collection("users").insertOne({
        username: this.username,
        nickname: this.nickname,
        email: this.email,
        password: hashPassword,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async userAlreadyExist(email) {
    try {
      const user = await db
        .getDb()
        .collection("users")
        .findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
