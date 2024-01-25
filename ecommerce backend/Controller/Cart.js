const { Cart } = require("../model/Cart");

exports.addToCart = async (req, res) => {
  try {
    const {id} = req.user;
    const cart = new Cart({...req.body,user:id});
    const doc = await cart.save();
    const result = await doc.populate('product')
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchCartsByUser = async (req, res) => {
    const {id } = req.user;
    try{
      const cartItems = await Cart.find({user:id}).populate('product').populate('user').exec();
      res.status(200).json(cartItems);
    }
    catch(err){
        res.status(400).json(err);
    }

};

exports.updateCart= async (req, res) => {
    try{
      const {id} = req.params ;
      const doc = await Cart.findByIdAndUpdate(id,req.body,{new:true}).populate('product').populate('user').exec();
      res.status(200).json(doc);
    }
    catch(err){
      res.status(400).json(err);
    }
  }

  
exports.deleteFromCart = async (req, res) => {
    try{
      const {id }= req.params;
      const doc = await Cart.findByIdAndDelete(id)
      res.status(200).json(doc);
    }
    catch(err){
      res.status(400).json(err);
    }
  }


  