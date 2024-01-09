const express = require("express");
const { createOrder, fetchOrdersByUser, updateOrder, deleteOrder, fetchAllOrders } = require("../Controller/Order");
const router = express.Router();

router.post('/',createOrder)
router.get('/user/:userId',fetchOrdersByUser)
router.get('/',fetchAllOrders)
router.patch('/:id',updateOrder)
router.delete('/:id',deleteOrder)

exports.router = router;