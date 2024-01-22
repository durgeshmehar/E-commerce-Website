const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  product.DiscountPrice = Math.round(product.price*(1-product.discountPercentage/100));
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.fetchProductsByFilter = async (req, res) => {
   let condition ={};
  if(!req.query.admin){
    condition={deleted:{$ne:true}}
  }

  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);
  //category  //brand //sort   //pagination

  if (req.query.category) {
    query = query.find({ category: {$in:req.query.category.split(",")}});
    totalProductsQuery = totalProductsQuery.find({category: {$in:req.query.category.split(",")} });
  }
  if (req.query.brand) {
    query = query.find({ brand: {$in:req.query.brand.split(",")} });
    totalProductsQuery = totalProductsQuery.find({ brand: {$in:req.query.brand.split(",")}  });
  }
  const totalProducts = await totalProductsQuery.count().exec();
  res.set("X-Total-Count", totalProducts);
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order});
  }
  if (req.query._page && req.query._limit) {
    let size = req.query._limit;
    let page = req.query._page;
    query = query.skip(size * (page - 1)).limit(size);
  }

  try {
    const doc = await query.exec();
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Product.findById(id)
    res.status(200).json(doc);
  }
  catch(err){
    res.status(400).json(err);
  }
}

exports.updateProductById = async (req, res) => {
  try{
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id,req.body,{new:true})
    product.DiscountPrice = Math.round(product.price*(1-product.discountPercentage/100));
    const doc = await product.save();
    res.status(200).json(doc);
  }
  catch(err){
    res.status(400).json(err);
  }
}

  