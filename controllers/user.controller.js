const User = require("../models/user.model");
const validation = require("../util/validation");

function signup(req, res) {
  res.render("users/signup");
}

function userSign(req, res) {
  if (
    !validation.userDetailsAreValid(
      req.body.username,
      req.body.nickname,
      req.body.email,
      req.body.password
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body["confirm-email"])
  ) {
    return res.redirect("/signup");
  }

  const user = new User(
    req.body.username,
    req.body.nickname,
    req.body.email,
    req.body["confirm-email"],
    req.body.password
  );

  user.save();

  res.redirect("/");
}

module.exports = {
  signup: signup,
  userSign: userSign,
};
