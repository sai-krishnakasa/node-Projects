const User = require("./user")
const mongoose = require("mongoose")
const Product = require("./product")

const LikeSchema = mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
}, {
    timestamps: true
})

const Likes = mongoose.model("Likes", LikeSchema)
module.exports = Likes;