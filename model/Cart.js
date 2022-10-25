const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'title must be provided'],
    },
    product: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }

        }
    ]

})

module.exports = mongoose.model('Cart', CartSchema)

