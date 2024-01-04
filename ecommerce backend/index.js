const express = require('express')
const server = express()
const mongoose = require('mongoose')
const ProductsRouter = require('./routes/Products')
const CategoriesRouter = require('./routes/Categories')
const BrandsRouter = require('./routes/Brands')
const cors = require('cors')

server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
server.use(express.json())
server.use('/products',ProductsRouter.router)
server.use('/categories',CategoriesRouter.router)
server.use('/brands',BrandsRouter.router)
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