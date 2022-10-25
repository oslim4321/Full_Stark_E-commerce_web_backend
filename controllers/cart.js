const CartSchema = require('../model/Cart')

module.exports.CartPost = async (req, res) => {
    const carts = req.body;
    try {
        const SaveCart = await CartSchema.create(carts)
        res.status(200).json(SaveCart)
    } catch (error) {

        res.status(400).json('Cant Post Item')

    }
}

module.exports.Update = async (req, res) => {
    try {
        const UpdateCart = await CartSchema.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true }
        );
        res.status(200).json(UpdateCart)
    } catch (error) {

    }
}


module.exports.delete = async (req, res) => {
    try {
        await CartSchema.findByIdAndDelete(req.params.id)
        res.status(200).json('cart deleted successful')
    } catch (error) {
        res.status(500).json('failed to delete')

    }
}

/* get single product */
module.exports.getSingleCart = async (req, res) => {

    try {
        const cart = await CartSchema.findOne({ userId: req.params.userId })
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json('failed to delete products')

    }
}


// /* get all cart */
module.exports.getAllCart = async (req, res) => {
    try {
        const AllCart = await CartSchema.find()
        res.status(200).json(AllCart)
    } catch (error) {
        res.status(500).json(error.message)
    }
}