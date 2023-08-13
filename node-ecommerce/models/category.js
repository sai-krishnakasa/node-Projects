const mongoose = require("mongoose")
const Product = require("./product")

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Category Already Exists"]
    },
})


categorySchema.pre("save", function (next) {
    this.name = this.name.toUpperCase();
    next();
})

const Category = mongoose.model("Category", categorySchema)
module.exports = Category;