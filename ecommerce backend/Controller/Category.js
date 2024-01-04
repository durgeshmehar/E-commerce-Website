const {Category} = require('../model/Category');
exports.fetchCategories = async (req, res) => {
    try{
        const categories = await Category.find({});
        res.status(200).json(categories);
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.createCategory = async (req, res) => {
    try{
        const category = new Category(req.body);
        const data = await category.save();
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json(err);
    }
}