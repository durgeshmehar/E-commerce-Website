const { Order } = require("../model/Order");

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
  try {
    const order = new Order(req.body);
    const doc = await order.save();
    const result = await doc.populate('user')
    console.log("createOrder response :",result)
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder= async (req, res) => {
  try{
    const {id} = req.params ;
    console.log("Id , DAta of backend:",id, "  ",req.body)
    const doc = await Order.findByIdAndUpdate(id,req.body,{new:true});
    console.log("updateOrder response :", doc)
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