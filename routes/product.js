const express = require('express')
const productRoute = express.Router()
const product = require('../controllers/product')
const Stripe = require('../controllers/Stripe')
const { varifytoken, varifyTokenAndAutorization, varifyTokenAndAdmin } = require('../middleware/VarifyToken')


productRoute.post('/stripe', Stripe.Stripe)

productRoute.post('/', product.NewItem)
productRoute.patch('/:id', varifyTokenAndAdmin, product.Update)
productRoute.delete('/:id', varifyTokenAndAdmin, product.delete)
productRoute.get('/', product.getAll)
productRoute.get('/:id', product.getSingle)





module.exports = productRoute