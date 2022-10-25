const express = require('express')
const CartRoute = express.Router()
const cart = require('../controllers/cart')
const { varifytoken, varifyTokenAndAutorization, varifyTokenAndAdmin } = require('../middleware/VarifyToken')

CartRoute.post('/', cart.CartPost)

CartRoute.get('/:userId', cart.getSingleCart)
CartRoute.get('/', varifyTokenAndAdmin, cart.getAllCart)
CartRoute.put('/:id', cart.Update)
CartRoute.delete('/:id', cart.delete)




module.exports = CartRoute