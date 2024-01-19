const mongoose = require('mongoose')
const { Schema } = mongoose

const OrderSchema = new Schema({
    cart: [{ type: Schema.Types.Mixed , required: true }],
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethod: { type: String },
    paymentStatus: { type: String ,default:"pending"},
    status: { type: String },
    selectedAddress: { type: Schema.Types.Mixed, required: true }
})

const virtual = OrderSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
OrderSchema.set('toJSON',{virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}})
    
exports.Order = mongoose.model('Order',OrderSchema);