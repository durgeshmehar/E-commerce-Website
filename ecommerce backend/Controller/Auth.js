const { User } = require('../model/User');
const crypto = require('crypto');
exports.createUser = async (req,res)=>{
    try{
        const salt = crypto.randomBytes(16);
        const hash = crypto.pbkdf2Sync(req.body.password,salt,1000,32,'sha256');
        const user = new User({...req.body,salt,password:hash});
        const result = await user.save();
        res.status(200).json({message:"User Created Successfully",result});
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

exports.loginUser = async (req,res)=>{
    res.json(req.user)
}
exports.checkUser = async (req,res)=>{
    try{
        const {id,email,password,addresses ,role, orders } = req.user;
       res.status(200).json({id,email,password,addresses ,role, orders });
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}