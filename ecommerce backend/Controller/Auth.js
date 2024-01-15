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

        req.login(sanitiseUser(result),function(err){
            if(err){res.status(400).json(err) }
            else{
                const token = jwt.sign(sanitiseUser(result),SECRET_KEY);
                res.cookie('jwt',token,{expires:new Date(Date.now()+ 60*60*1000),httpOnly:true}).status(200).json(token);
            }
        })
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

exports.loginUser = async (req,res)=>{
    console.log("User Logged In Successfully :",req.user)
    console.log("User Logged In Successfully token:",req.user.token)
    res.cookie('jwt',req.user.token,{expires:new Date(Date.now()+ 60*60*1000),httpOnly:true}).status(200).json(req.user.token);
}

exports.checkUser = async (req,res)=>{
    try{
        const { id, username, email, role } = req.user;
       res.status(200).json({status:"Success",user:{ id, username, email, role }});
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}