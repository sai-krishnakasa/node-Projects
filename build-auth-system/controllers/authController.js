const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.login_get = (req, res) => {
  res.send("Login Get");
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (email) => {
  return jwt.sign({ email }, "secret", {
    expiresIn: maxAge,
  });
};

module.exports.login_post = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    token = createToken(user.email);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    req.user = user;
    res.send("Logged in Successfully");
    // console.log(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(JSON.stringify(err.message));
  }
};

module.exports.sign_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newuser = await User.create({ email, password });
    res.send("user Created");
  } catch (err) {
    res.status(400).send(JSON.stringify(err.errors));
    // console.log(err);
  }
};
