const {Brand} = require('../model/Brand');

exports.fetchBrands = async (req, res) => {
    try{
        const brands = await Brand.find({}).exec();
        res.status(200).json(brands);
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.createBrand = async (req, res) => {
    try{
        const brand = new Brand(req.body);
        const data = await brand.save();
        res.status(200).json(data);
    }
    catch(err){
        res.status(400).json(err);
    }
}