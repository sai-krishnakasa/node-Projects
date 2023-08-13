const express = require("express")
const authController = require('../controllers/authController')
const router = express.Router()
const User = require('../models/user')
const dot_env = require('dotenv')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')
const homeController = require('../controllers/homeController')


dot_env.config()

module.exports = (productUpload, profileUpload) => {
    router.get('/home', homeController.getHome)
    router.get('/profile', homeController.getProfile)
    router.put('/profile', profileUpload.single("image"), homeController.profile_put)
    router.get('/addProductGet', homeController.addProductGet);
    router.post('/addProductPost', productUpload.single('image'), homeController.addProductPost);
    router.get('/deleteProduct/:product_id', homeController.deleteProduct)
    return router;
}
