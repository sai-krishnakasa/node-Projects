const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("./middlewares/authMiddleware");
const authRoutes = require("./routers/authRouter");
const cookieParser = require("cookie-parser");
app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(8000), console.log("DB Connected");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(authRoutes);
app.use(cookieParser());
app.get("/pro", requireAuth, (req, res) => {
  console.log("Protected resource");
});
