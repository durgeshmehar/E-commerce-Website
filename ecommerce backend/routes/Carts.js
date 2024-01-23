const express = require("express")
const { fetchCartsByUser, addToCart,deleteFromCart,updateCart } = require("../Controller/Cart");
const router = express.Router();

router.post('/',addToCart)
router.get('/',fetchCartsByUser)
router.patch('/:id',updateCart)
router.delete('/:id',deleteFromCart)

exports.router = router;