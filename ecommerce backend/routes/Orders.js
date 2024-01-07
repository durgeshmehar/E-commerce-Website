const express = require("express");
const { createOrder, fetchOrdersByUser, updateOrder, deleteOrder } = require("../Controller/Order");
const router = express.Router();

router.post('/',createOrder)
router.get('/',fetchOrdersByUser)
router.patch('/:id',updateOrder)
router.delete('/:id',deleteOrder)

exports.router = router;