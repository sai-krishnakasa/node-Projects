const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    salary: Boolean
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)