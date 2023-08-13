const mongoose = require("mongoose");
const Comments = require("./comments");
const Category = require("./category");
const Likes = require("./likes");


const ProductSchema = mongoose.Schema({

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    image: {
        type: String,
    },
    name: {
        type: String,
        required: [true, 'This field is required'],
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: Number,
    quantity: Number,
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes"
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    },
})

const Products = mongoose.model("Products", ProductSchema)

module.exports = Products;
