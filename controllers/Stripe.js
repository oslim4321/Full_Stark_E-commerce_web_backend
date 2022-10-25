const stripe = require('stripe')(process.env.STRIPE_KEY)

module.exports.Stripe = (req, res) => {

    stripe.charges.create({
        source: req.body.tokinId,
        amount: req.body.amount,
        currency: 'usd',
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json(stripeErr)

        } else {
            res.status(200).json(stripeRes)
        }

    })
}