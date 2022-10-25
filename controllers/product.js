const ProductSchema = require('../model/Product')

module.exports.NewItem = async (req, res) => {
    const products = req.body;

    try {
        const Post = await ProductSchema.create(products)
        res.status(200).json(Post)
    } catch (error) {

        res.status(400).json('CAnt Post Item')

    }
}

module.exports.Update = async (req, res) => {
    try {
        const UpdatedProduct = await ProductSchema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }
        );

        res.status(200).json(UpdatedProduct)
    } catch (error) {

    }
}


module.exports.delete = async (req, res) => {
    try {
        await ProductSchema.findByIdAndDelete(req.params.id)
        res.status(200).json('user deleted successful')
    } catch (error) {
        res.status(500).json('failed to delete')

    }
}

/* get single product */
module.exports.getSingle = async (req, res) => {

    try {
        const data = await ProductSchema.findById(req.params.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json('failed to get products')

    }
}


/* get all user */
module.exports.getAll = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products
        if (qNew) {
            products = await ProductSchema.find().sort({ createdAt: -1 }).limit(1)
        } else if (qCategory) {
            products = await ProductSchema.find({
                categories: {
                    $in: [qCategory]
                }
            })
        } else {
            products = await ProductSchema.find().sort({ createdAt: -1 })
        }

        res.status(200).json(products)
    } catch (error) {
        res.status(500).json('failed to get all products')

    }
}
