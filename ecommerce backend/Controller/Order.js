const { Order } = require("../model/Order");
const { User } = require("../model/User");
const { Product } = require("../model/Product");
const { sendMail,invoiceTemplate } = require("../services/common");

exports.fetchOrdersByUser = async (req, res) => {
  const { id } = req.user;
  try{
      const orders = await Order.find({user:id}).populate('user').exec();
      res.status(200).json(orders);
  }
  catch(err){
      res.status(400).json(err);
  }
};

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    for(let item of order.cart){
      let product = await Product.findById(item.product.id);
      product.$inc('stock',-1*item.quantity);
      await product.save();
    }
    const result = await order.save();
    const user = await User.findById(order.user)


   sendMail({to:user.email, subject:"Your Order is Placed Successfully.",text:"Your Order is placed.", html:invoiceTemplate(order)})
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder= async (req, res) => {
  try{
    const {id} = req.params ;
    const order = await Order.findById(id);

    if(order.status === "cancelled"){
        for(let item of order.cart){
          const product = await Product.findById(item.product.id);
          product.$inc('stock',item.quantity);
          await product.save();
        }
    }
    const doc = await Order.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(doc);
  }
  catch(err){
    res.status(400).json(err);
  }
}

exports.deleteOrder = async (req, res) => {
  try{
    const {id }= req.params;
    const doc = await Order.findByIdAndDelete(id)
    res.status(200).json(doc);
  }
  catch(err){
    res.status(400).json(err);
  }
}

exports.fetchAllOrders = async (req, res) => {
  let query = Order.find({deleted:{$ne:true}});
  let totalOrdersQuery = Order.find({deleted:{$ne:true}});
 
  const totalOrders = await totalOrdersQuery.count().exec();
  res.set("X-Total-Count", totalOrders);

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