const { User } = require('../model/User');

exports.createUser = async (req,res)=>{
    try{
        const user = new User(req.body);
        const result = await user.save();
        res.status(200).json({message:"User Created Successfully",result});
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

exports.loginUser = async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(401).json({message:"User Email Not Found"});
        }
        else if(user.password === req.body.password){
            res.status(201).json({id:user.id, email:user.email, name:user.name,addresses:user.addresses})
        }
        else{
            res.status(401).json({message:"Invalid Password Entered"});
        }

    }catch(err){
        res.status(400).json({message:err.message});
    }
}