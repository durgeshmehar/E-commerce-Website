const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
    title:{type:String,required:true,unique:true},
    description: {type:String,required:true},
    price: {type:Number,required:true, min:[1,"Price must be positive"],max:[1000000,"Price must be less than 1 million"]},
    discountPercentage : {type:Number,required:true, min:[1,"Discount must be positive"],max:[99,"Discount must be less than 100"]},
    rating:{type:Number,required:true, min:[0,"Rating must be positive"],max:[5,"Rating must be less than 5"],default:0},
    stock : {type:Number,required:true, min:[0,"Stock must be positive"],max:[1000000,"Stock must be less than 1 million"],default:0},
    brand:{type:String,required:true},
    category:{type:String,required:true},
    thumbnail:{type:String,required:true},
    images:{type:[String],required:true},
    colors:{type:[Schema.Types.Mixed]},
    sizes:{type:[Schema.Types.Mixed]},
    highlights:{type:[String]},
    deleted:{type:Boolean,default:false},
})

const virtual = ProductSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
ProductSchema.set('toJSON',{virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}})
    
exports.Product = mongoose.model('Product',ProductSchema)
