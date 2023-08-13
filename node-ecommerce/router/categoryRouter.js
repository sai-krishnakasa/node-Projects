const express = require("express")
const categoryController = require('../controllers/categoryController')
const homeController = require('../controllers/homeController')
const router = express.Router()
const User = require('../models/user')
const dot_env = require('dotenv')
const jwt = require('jsonwebtoken')

dot_env.config()

router.get('/getCategories', categoryController.getCategories);
module.exports = router;

