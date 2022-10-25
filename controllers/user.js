const UserSchema = require('../model/User')
const bcrypt = require('bcrypt')

module.exports.Update = async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.compare(req.body.password, req.body.password)

    }
    try {
        const UpdateUser = await UserSchema.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true }
        );
        res.status(200).json(UpdateUser)
    } catch (error) {

    }
}
module.exports.delete = async (req, res) => {
    // const data = await UserSchema.

    try {
        await UserSchema.findByIdAndDelete(req.params.id)
        res.status(200).json('user deleted successful')
    } catch (error) {
        res.status(500).json('failed to delete')

    }
}

/* get single user */
module.exports.getSingle = async (req, res) => {

    try {
        const data = await UserSchema.findById(req.params.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json('failed to get user')

    }
}


/* get all user */
module.exports.get = async (req, res) => {
    const query = req.query.new;

    try {
        const users = query
            ? await UserSchema.find().sort({ createdAt: -1 }).limit(2)
            : await UserSchema.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json('failed to get all user')

    }
}

/* Get amout of user registering in a month  */
module.exports.stats = async (req, res) => {
    const date = new Date()
    const lasYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await UserSchema.aggregate([
            { $match: { createdAt: { $gte: lasYear } } },
            {
                $project: {
                    month: { $month: '$createdAt' }
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data)
    } catch (error) {

    }
}