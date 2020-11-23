const mongoose = require('mongoose')
const SchemaTypes = mongoose.SchemaTypes
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

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
        required: [true, 'Phone number is required']
    },
    taxes: [
        {
            type: SchemaTypes.ObjectID,
            ref: 'Tax'
        }
    ]
})

UserSchema.set('toJSON', {getters: true, virtuals: true})
UserSchema.set('toObject', {getters: true, virtuals: true})

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
})

UserSchema.virtual('fullName').get(function () {
    return `${this.name.first} ${this.name.last}`
})

exports.User = mongoose.model('users', UserSchema)
