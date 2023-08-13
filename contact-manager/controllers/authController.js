const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const createToken = (id) => {
    token = jwt.sign({ id }, 'Secret Salt')
    return token;
}

module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Name , Email  and Password are required")
        }
        const user = await User.create({ name, email, password })
        if (user) {
            res.status(201).json({ "message": "User Signup successful", "user": user })
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error("Email and Password and Required to Login")
        }
        const user = await User.login(email, password)
        if (user) {
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                maxAge: 1000 * 60 * 15,
                httpOnly: true
            })
            res.status(200).json('Login Successful')
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}