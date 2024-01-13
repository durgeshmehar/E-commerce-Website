const { User } = require('../model/User');
const crypto = require('crypto');
const { sanitiseUser } = require('../services/common');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "SECRET_KEY";


exports.createUser = async (req,res)=>{
    try{
        const salt = crypto.randomBytes(16);
        const hash = crypto.pbkdf2Sync(req.body.password,salt,1000,32,'sha256');
        const user = new User({...req.body,salt,password:hash});
        const result = await user.save();
        req.login(result,function(err){
            if(err){res.status(400).json(err) }
            else{
                const token = jwt.sign(sanitiseUser(user),SECRET_KEY);
                res.status(200).json({token,user});
            }
        })
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

exports.loginUser = async (req,res)=>{
    res.json(req.user)
}
exports.checkUser = async (req,res)=>{
    try{
       res.status(200).json({status:"Success",user:req.user});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}