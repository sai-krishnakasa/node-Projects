const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    name: {
        type: String,
        requied: [true, "please add a name"]
    },
    mobile: {
        type: Number,
        require: [true, , "please add mobile number"]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Contact', ContactSchema)
