const { MongoServerClosedError, MongoParseError } = require('mongodb')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is Required']
    },
    password: {
        type: String
    }
})

userSchema.statics.login = async function (email, password) {
    const User = this;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Compare the provided password with the stored password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error('Invalid email or password');
    }

    return user;
};


userSchema.pre('save', async function (next) {
    // 'this' refers to the document being saved
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    // Perform some operations or modifications on the document
    // For example, you can hash the password before saving
    // this.password = hashFunction(this.password);

    // Call 'next()' to proceed with the saving process
    next();
});

module.exports = mongoose.model('Users', userSchema);