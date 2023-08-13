const express = require("express");
const fs = require("fs");
const shortid = require("shortid");

const app = express();

app.listen(8080, () => {
  console.log("Server Listening...");
});

app.get("/todo", (req, res) => {
  res.send("Todo");
});

const checkHeader = (req, res, next) => {
  console.log(req.headers);
  const data = fs.readFile(
    "C:\\Users\\saikrishna.kasa\\Desktop\\node_pros\\insta-task\\keygen.txt",
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
      }
      if (data.split("\n").includes(req.headers["auth"])) {
        next();
      } else {
        res.status(401).json({ status: "error", message: "unautorized" });
      }
    }
  );
};

app.get("/profile", checkHeader, (req, res) => {
  res.send("profile");
});

const authMiddleWare = (req, res, next) => {
  api_key = shortid.generate();
  fs.appendFile(
    "C:\\Users\\saikrishna.kasa\\Desktop\\node_pros\\insta-task\\keygen.txt",
    api_key + "\n",
    (err) => {
      console.log(err);
    }
  );
  next();
};

app.get("/auth", authMiddleWare, (req, res) => {
  res.send("auth");
});
