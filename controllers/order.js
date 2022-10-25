const { compareSync } = require('bcrypt');
const OrderSchema = require('../model/Order')

module.exports.OrderPost = async (req, res) => {
    const Orders = req.body;
    try {
        const OrderSave = await OrderSchema.create(Orders)
        res.status(200).json(OrderSave)
    } catch (error) {

        res.status(400).json('Cant Post Item')

    }
}

module.exports.Update = async (req, res) => {
    try {
        const UpdateOrder = await OrderSchema.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true }
        );
        res.status(200).json(UpdateOrder)
    } catch (error) {

    }
}


module.exports.delete = async (req, res) => {
    try {
        await OrderSchema.findByIdAndDelete(req.params.id)
        res.status(200).json('Order deleted successful')
    } catch (error) {
        res.status(500).json('failed to delete')

    }
}

/* get single user Order */
module.exports.getSingleOrder = async (req, res) => {

    try {
        const cart = await OrderSchema.find({ userId: req.params.userId })
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json('failed to delete products')

    }
}


// /* get all cart */
module.exports.getAllOrders = async (req, res) => {
    try {
        const AllOrder = await OrderSchema.find()
        res.status(200).json(AllOrder)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

/* GET MONTHLY INCLOM */
module.exports.income = async (req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

    try {
        const income = await OrderSchema.aggregate([
            { $match: { createdAt: { $gte: prevMonth } } },

            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount',
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: '$sales' }
                },
            },
        ])
        res.status(200).json(income)
    } catch (error) {

    }
}