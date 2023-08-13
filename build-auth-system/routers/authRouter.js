const authController = require("../controllers/authController");
const { Router } = require("express");
const router = Router();

router.post("/signup", authController.sign_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

module.exports = router;
