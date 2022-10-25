const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username must be provided'],
    },
    email: {
        type: String,
        required: [true, 'email must be provided'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
        minlength: 3,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },

})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    /* This <--- key word is pointing to the data of the user signing up */
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect Email')
}


module.exports = mongoose.model('Users', UserSchema)

