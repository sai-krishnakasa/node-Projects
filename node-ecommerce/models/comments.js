const User = require("./user")
const mongoose = require("mongoose")
const Product = require("./product")

const CommentSchema = mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    message: String,
}, {
    timestamps: true
})

const Comments = mongoose.model("Comments", CommentSchema)
module.exports = Comments;