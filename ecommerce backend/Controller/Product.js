const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
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
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }
  const totalProducts = await totalProductsQuery.count().exec();
  console.log({totalProducts});
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
    console.log("Product findById at backend :",doc);
    res.status(200).json(doc);
  }
  catch(err){
    res.status(400).json(err);
  }
}

exports.updateProductById = async (req, res) => {
  try{
    const id = req.params.id;
    const doc = await Product.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(doc);
  }
  catch(err){
    res.status(400).json(err);
  }
}

  