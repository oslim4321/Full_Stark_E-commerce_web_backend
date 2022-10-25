const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'title must be provided'],
    },
    desc: {
        type: String,
    },
    img: {
        type: String,
        required: [true, 'img must be provided'],
    },
    categories: {
        type: Array,
        required: [true, 'category must be provided'],
    },
    size: {
        type: Array,

    },
    price: {
        type: Number,
        required: [true, 'price must be provided'],

    },
    color: {
        type: Array,

    },
    inStock: {
        type: Boolean,
        default: true
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)

