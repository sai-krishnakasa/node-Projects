const { Router } = require('express')
const router = Router()
const authController = require('../controllers/authController')

router.route('/singup').post(authController.signup_post);
router.route('/login').post(authController.login_post);

module.exports = router;