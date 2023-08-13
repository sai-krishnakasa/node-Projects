const { default: mongoose } = require("mongoose");
const { isURL } = require('validator');
const shortid = require('shortid');



const urlSchmea = mongoose.Schema({
    long_url: {
        type: String,
        required: [true, 'please enter the original url'],
        unique: true,
        validate: [isURL, 'please enter a valid url']
    },
    short_url: {
        type: String,
        unique: true,
        validate: [isURL, 'please enter a valid url']
    }
}
)  

urlSchmea.pre('save', async function (next) {
    const short_url = `https://hexa-shortner/${shortid.generate()}`
    this.short_url = short_url;
    next();
});

const model = mongoose.model('url', urlSchmea);

module.exports = model;

// const mongoose = require('mongoose');
// const { isEmail } = require('validator');
// const bcrypt = require('bcrypt');


// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: [true, 'Please Enter an email'],
//         unique: true,
//         lowercase: true,
//         validate: [isEmail, 'Please Enter a Valid Email']
//     },
//     password: {
//         type: String,
//         required: [true, 'Please Enter an Password'],
//         minlength: [6, "Minmum Password Length is 6 charcters"]
//     },
// });

// // fire a function after doc is saved to db

// userSchema.post('save', function (doc, next) {
//     console.log("new user was Saved", doc);
//     next();
// })

// // fire a function before is saved to db
// userSchema.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);

//     console.log("User Password is Hashed  ", this)
//     next();
// })

// // creating a static method to login user

// userSchema.statics.login = async function (email, password) {
//     const user = await this.findOne({ email });
//     if (user) {
//         if (await bcrypt.compare(password, user.password)) {
//             return user;
//         }
//         throw Error('incorrect password');
//     }
//     throw Error('incorrect email');
// }

// const User = mongoose.model('user', userSchema);
