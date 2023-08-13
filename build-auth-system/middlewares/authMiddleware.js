const jwt = require("jsonwebtoken");
const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  const user = req.user;
  if (token) {
    jwt.verify(token, "secret", (err, decodedToken) => {
      if (!err) {
        console.log(decodedToken);
        next();
      } else {
        console.log(err);
        res.redirect("/login");
      }
    });
  }
  res.redirect("/login");
};

module.exports = requireAuth;
