const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const Valildators = require('./validators');
const cookieParser = require("cookie-parser");
const multer = require('multer')
dotenv.config()



const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, "Username Must be Unique"],
    },
    password: {
        type: String,
        required: [true, 'please enter the password'],
    },
    email: {
        type: String,
        validate: {
            validator: Valildators.emailValidator,
            message: props => `${props.value} is not a valid Email`
        },
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                const number = String(v);
                if (!["6,", "7", "8", "9"].includes(number[0]) || number.length != 10) {
                    return false
                }
                return true
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    address: String,
    image: {
        type: String,
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    isAdmin: Boolean,
    isSeller: Boolean,
    isBuyer: Boolean
})



UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ "email": email })
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    return false;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
