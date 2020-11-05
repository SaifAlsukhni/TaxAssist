const mongoose = require('mongoose')
const SchemaTypes = mongoose.SchemaTypes
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    taxes: [
        {
            type: SchemaTypes.ObjectID,
            ref: 'Tax'
        }
    ]
})

UserSchema.virtual('fullName').get(function () {
    return `${this.name.first} ${this.name.last}`
})

UserSchema.pre('save', async function (next) {
    let user = this
    try {
        user.password = await bcrypt.hash(user.password, 10)
    } catch (error) {
        console.log(`Error in hashing password: ${error.message}`)
    }
})

/*
UserSchema.pre('save', async function (next) {
    let user = this
    try {
        user.email = await bcrypt.hash(user.email, 10)
    } catch (error) {
        console.log(`Error in hashing email: ${error.message}`)
    }
})

UserSchema.methods.emailComparison = async function(inputEmail) {
    let user = this
    return await bcrypt.compare(inputEmail, user.email)
}
*/

UserSchema.methods.passwordComparison = async function(inputPassword) {
    let user = this
    return await bcrypt.compare(inputPassword, user.password)
}

exports.User = mongoose.model('users', UserSchema)

