const jwt = require('jsonwebtoken');
const User = require('../models/user')
const SECRET_KEY = process.env.SECRET_KEY;

const requireAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: 'No Token in Cookie'
        })
    }
    try {
        const decode = jwt.verify(token, SECRET_KEY);
        console.log(decode)
        req.user = await User.findOne({ _id: decode._id })
        console.log(req.user)
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Session Expired',
                error: error.message,
            })
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: 'Invalid Token',
                error: error.message,
            })
        }
        res.status(500).json({
            message: 'Internal server Error',
            error: error.message,
            stack: error.stack
        });
    }
}


module.exports = requireAuth;
