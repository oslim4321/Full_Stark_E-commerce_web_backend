const UserSchema = require('../model/User')
const { handleErr, handleLoginErr } = require('../errors/custom-error')
const jwt = require('jsonwebtoken')


const createToken = (id, admin) => {
    return jwt.sign({ id, admin }, process.env.JWT_SEC, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

/* REGISTER */
module.exports.Register = async (req, res) => {
    try {
        const data = await UserSchema.create(req.body)
        // const token = createToken({
        //     id: data._id,
        //     isAdmin: data.isAdmin
        // })
        res.status(200).json({ success: 'Account created success' })
    } catch (error) {
        const err = handleErr(error)
        res.status(500).json(err)

    }
}


/* LOGIN */
module.exports.Login = async (req, res) => {
    try {
        const request = req.body
        // let { email, password } = request;
        const user = await UserSchema.login(request.email, request.password)
        const token = createToken({
            id: user._id,
            isAdmin: user.isAdmin
        })
        const { password, ...others } = user._doc

        res.status(200).json({ ...others, token: token })


    } catch (error) {
        const err = handleLoginErr(error)
        res.status(404).json(err)

        // res.status(500).json(error)

    }
}