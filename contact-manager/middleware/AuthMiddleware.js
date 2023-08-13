const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;
    try {

        if (!token) {
            res.status(400).json({ "error": "Token Not Found" })
        }
        const decodeToken = jwt.verify(token, 'Secret Salt')
        // console.log(decodeToken)
        const user = await User.findById({ '_id': decodeToken.id })
        // console.log(user);
        if (!user) {
            res.status(400).json({ "error": "Token INvalid or Expired" })
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.log(err.message)
    }
}

module.exports = authMiddleware;