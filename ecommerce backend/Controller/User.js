const { User } = require('../model/User');

exports.fetchUserById = async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await User.findById(id,'name email id role orders addresses').exec();
        res.status(200).json(result);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

exports.updateUserById = async (req,res)=>{
    try{
        const id = req.params.id;
        const result = await User.findByIdAndUpdate(id,req.body,{new:true}).select('name email id role orders addresses');
        res.status(200).json(result);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}
