const jwt = require('jsonwebtoken')


const varifytoken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
            if (err) return res.status(404).json('your token expire pls login');
            req.user = decoded;
            next()
        })
    } else {
        return res.status(404).json('you are not authenticated')

    }
}

const varifyTokenAndAutorization = (req, res, next) => {
    varifytoken(req, res, () => {


        if (req.user.id.id === req.params.id || req.user.id.isAdmin) {
            next()
        } else {
            res.status(404).json('sorry! you are not allowed')
        }
    })
}

const varifyTokenAndAdmin = (req, res, next) => {
    varifytoken(req, res, () => {

        if (req.user.id.isAdmin) {
            next()
        } else {
            res.status(404).json('sorry! you are not allowed')
        }
    })
}


module.exports = { varifytoken, varifyTokenAndAutorization, varifyTokenAndAdmin }