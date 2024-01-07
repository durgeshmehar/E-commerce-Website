const { Order } = require("../model/Order");

exports.fetchOrdersByUser = async (req, res) => {
  const { user } = req.query;
  try{
      const orders = await Order.find({user:user}).populate('user').exec();
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
    const doc = await Order.findByIdAndUpdate(id,req.body,{new:true}).populate('product').populate('user').exec();
    console.log("DAta of backend:",{doc})
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

  