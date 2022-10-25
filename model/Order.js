
const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'title must be provided'],
    },
    product: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }

        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },

    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" }

})


module.exports = mongoose.model('Order', OrderSchema)

