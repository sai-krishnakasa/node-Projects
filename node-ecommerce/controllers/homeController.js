const Category = require('../models/category')
const Product = require('../models/product')
const User = require('../models/user')
const fs = require('fs/promises')
module.exports.getHome = async (req, res) => {
    const products = await Product.find().populate("category");
    console.log(req.user)
    res.render("product", { "products": products, "user": req.user ?? null, isHome: true })
};

module.exports.addProductGet = async (req, res) => {
    const categories = await Category.find()
    const cats = categories.map((item) => {
        return {
            "name": item.name,
            "_id": item.id
        }
    })
    res.render('createProduct', { "categories": cats, "user": req.user })
}

module.exports.addProductPost = async (req, res) => {
    function hasNumbers(t) {
        var regex = /\d/g;
        return regex.test(t);
    }
    console.log(req.data)
    let { category, name, price, quantity, description } = req.body;
    const image = req.file
    const imagePath = req.file.path.split("uploads\\")[1]
    if (!hasNumbers(category)) {
        category_exists = await Category.findOne({ "name": category.toUpperCase() })
        if (category_exists) {
            category = category_exists;
        }
        else {
            category = new Category({ "name": category.toUpperCase() })
            await category.save();
        }
    }
    else {
        category = await Category.findOne({ "_id": category })

    }

    try {
        const newProd = new Product({
            category: category._id, name, price, quantity, image: imagePath, description
        })
        await newProd.save()
    }
    catch (err) {
        console.log(err);
    }
    return res.status(200).json({ "success": "Product Created Successfully" })
}


module.exports.getProfile = async (req, res) => {
    console.log(req.user);
    return res.render('profile', { "user": req.user })
}



module.exports.profile_put = async (req, res) => {
    const user = await User.findById({ "_id": req.user._id });
    console.log(req.body)
    console.log(req.file)
    //console.log("=======================req.body================================")
    //console.log(req.file)
    const { phone, username, email } = req.body;
    try {
        const dup_user = await User.findOne({ "email": email });

        let pattern = /^[6-9]\d{9}$/
        if (!pattern.test(phone)) {
            throw new Error(JSON.stringify({ "phone": "Invalid Mobile Number" }))
        }
        if (dup_user && user.id != dup_user.id) {
            throw new Error(JSON.stringify({ "email": "Email is Already Registred with another Account" }))
        }

        if (req.file) {
            user.phone = phone;
            user.email = email;
            user.username = username;
            user.image = req.file.path.split('uploads\\')[1]
            await user.save()
        }
        else {
            user.phone = phone;
            user.email = email;
            user.username = username;
            await user.save()
        }

        res.status(200).json({ "success": "Profile Updated Successfully" })
    }
    catch (err) {
        //console.log("==============================")
        console.log(err);
        //console.log("==============================")

        // const errors = handleErrors(err);
        // res.json({ "errors": errors })
    }
}


module.exports.deleteProduct = async (req, res) => {
    const product_id = req.params.product_id;
    console.log(product_id)
    if (!product_id) {
        return res.status(400).json({ "error": "prduct_id not Found" })
    }
    // Find the product by ID.
    const product = await Product.findById({ _id: product_id });
    console.log(product)
    image_path = 'uploads/' + product.image;
    console.log(image_path)
    fs.unlink(image_path)
    await Product.deleteOne({ _id: product_id });
    if (!product) {
        return res.status(404).json({ error: 'product not found' });
    }
    return res.redirect('/home')

}

