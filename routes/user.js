const express = require('express')
const { varifytoken, varifyTokenAndAutorization, varifyTokenAndAdmin } = require('../middleware/VarifyToken')

const userRoute = express.Router()
const auth = require('../controllers/auth')
const user = require('../controllers/user')



userRoute.post('/Register', auth.Register)
userRoute.post('/Login', auth.Login)
userRoute.put('/:id', varifyTokenAndAutorization, user.Update)
userRoute.get('/stats', varifyTokenAndAdmin, user.stats)
userRoute.delete('/:id', varifyTokenAndAutorization, user.delete)
userRoute.get('/findAll', varifyTokenAndAdmin, user.get)
userRoute.get('/:id', varifyTokenAndAdmin, user.getSingle)



module.exports = userRoute