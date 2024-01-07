const express = require('express')
const server = express()
const mongoose = require('mongoose')
const cors = require('cors')

const ProductsRouter = require('./routes/Products')
const CategoriesRouter = require('./routes/Categories')
const BrandsRouter = require('./routes/Brands')
const UsersRouter = require('./routes/Users')
const AuthRouter = require('./routes/Auth')
const CartRouter = require('./routes/Carts')
const OrderRouter = require('./routes/Orders')

server.use(cors({
    exposedHeaders:['X-Total-Count']
}))

server.use(express.json())
server.use('/products',ProductsRouter.router)
server.use('/categories',CategoriesRouter.router)
server.use('/brands',BrandsRouter.router)
server.use('/users',UsersRouter.router)
server.use('/auth',AuthRouter.router)
server.use('/cart',CartRouter.router)
server.use('/orders',OrderRouter.router)

main().catch(err => console.log(err))

async function main(){
    await mongoose.connect('mongodb://localhost:27017/ecommerce')
}

server.get('/',(req,res)=>{
    res.json({status:'Hello World'})
})

server.listen(8080,()=>{
    console.log('Server is running...');
})