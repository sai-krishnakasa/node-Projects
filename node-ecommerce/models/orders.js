const User = require("./user")
const mongoose = require("mongoose")
const Product = require("./product")

const isPositive = (value) => {
    if (value < 1) {
        throw new Error("Quantity must be a positive number");
    }
};

const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true,
        validate: [isPositive]
    }
}, {
    timestamps: true
})

OrderSchema.pre("save", async function (next) {

    const product = await Product.findOne({ _id: this.product })
    if (product) {
        product.quantity -= this.quantity
        await product.save();
    }
    next();
})
const Order = mongoose.model("Order", OrderSchema)
module.exports = Order;