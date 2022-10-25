const express = require('express')
const OrderRoute = express.Router()
const Order = require('../controllers/order')
const { varifytoken, varifyTokenAndAutorization, varifyTokenAndAdmin } = require('../middleware/VarifyToken')

OrderRoute.get('/income', Order.income);
OrderRoute.get('/', varifyTokenAndAdmin, Order.getAllOrders);
OrderRoute.get('/:userId', varifyTokenAndAutorization, Order.getSingleOrder)
OrderRoute.post('/', varifytoken, Order.OrderPost);
OrderRoute.put('/:id', varifyTokenAndAdmin, Order.Update);
OrderRoute.delete('/:id', varifyTokenAndAdmin, Order.delete);




module.exports = OrderRoute