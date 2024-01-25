const express = require("express")
const { Product } = require("../model/Product");
const { createProduct ,fetchProductsByFilter,fetchProductById,updateProductById}= require('../Controller/Product')
const router = express.Router();

router.get('/',fetchProductsByFilter)
router.post('/',createProduct)
router.get('/:id',fetchProductById)
router.patch('/:id',updateProductById)

exports.router = router;