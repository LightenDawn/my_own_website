const path = require("path");

const express = require("express");

const errorHandlerMiddleware = require('./middlewares/error_handler');
const db = require("./data/database");
const baseRoute = require("./routes/base.route");
const userRoute = require("./routes/user.route");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(baseRoute);
app.use(userRoute);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("與資料庫連結失敗");
    console.log(error);
  });
