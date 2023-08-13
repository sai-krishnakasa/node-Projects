const express = require("express")
const authController = require('../controllers/authController')
const router = express.Router()
const User = require('../models/user')
const dot_env = require('dotenv')
const jwt = require('jsonwebtoken')
dot_env.config()

module.exports = (profileUpload) => {
    router.get('/login', authController.getLogin);
    // router.get('/login',authController.getLogin);
    router.post('/login/', authController.postLogin)
    router.get('/signup', authController.getSignup)
    router.get('/logout', authController.logout)

    router.post('/signup', profileUpload.single('image'), authController.postSignup)
    return router;
}

// module.exports = (uploadProfilePic) => {
//     router.get('/profile', userController.profile_get);
//     router.put('/profile', uploadProfilePic.single('profile_pic'), userController.profile_put);
//     return router;
// }


