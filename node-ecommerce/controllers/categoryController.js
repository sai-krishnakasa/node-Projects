const Category = require('../models/category');
module.exports.getCategories = async (req, res) => {
    const categories = await Category.find()
    const cats = categories.map((item) => {
        return {
            "name": item.name,
            "_id": item.id
        }
    })
    res.status(200).json({ "categories": cats })
}
