const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports.getLogin = async (req, res) => {
    res.render("login", { "user": null });
}

module.exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    console.log(user);
    if (user) {
        const token = jwt.sign({ '_id': user._id }, process.env.SECRET_KEY)
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 3 })
        res.status(200).json({ "user": user._id })
    }
    else {
        res.send({ "error": `Invalid Credentials` });
    }
    console.log("Render the Login Page")
}

module.exports.getSignup = async (req, res) => {
    res.render("singup", { "user": null })
}

module.exports.logout = async (req, res) => {
    res.cookie('token', '', { maxAge: 1 });
    res.render('login', { user: null })
}

module.exports.postSignup = async (req, res) => {
    const { email, phone, username, password } = req.body;
    if (email && phone && username && password) {
        try {
            console.log(req.file)

            console.log(req.file.path.split('uploads\\')[1])
            // const dupUser = await User.findOne({ email })
            const user = req.file ? User({ email, phone, username, password, image: req.file.path.split('uploads\\')[1] }) : User({ email, phone, username, password });
            await user.save();
            res.status(200).json({ "user": user._id })
        }
        catch (err) {
            console.log(err);
            res.send({ "error": "Failed to Create the user " })
        }
    }
    else {
        res.send({ "error": "All fields are required" })
    }
}