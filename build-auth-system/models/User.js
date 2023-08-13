const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { use } = require("../routers/authRouter");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Enter a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "MIn len 6"],
  },
});

userSchema.post("save", async function (doc, next) {
  console.log("new User", doc);
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log("user Password hashed", this);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
