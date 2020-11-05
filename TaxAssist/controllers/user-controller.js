let User = require('../models/user').User
const { body, validationResult} = require('express-validator')

const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL,
            { useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true }
        )
    } catch (err) {
        console.log(err)
    }
}

exports.userController = {
    create: async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('/users/register')
        } else {
            try {
                await connectDB()
                let userParams = getUserParams(req.body)
                let user = await User.create(userParams)
                await mongoose.disconnect()
                req.flash('success', `${user.fullName}'s created successfully`)
                res.redirect('/')
            } catch (error) {
                console.log(`Error saving user: ${error.message}`)
                req.flash('error', `Failed to create user account because ${error.message}`)
                res.redirect('/users/register')
            }
        }
    },

    authenticate: async (req, res) => {
        await connectDB()
        try {
            let user = await User.findOne({email: req.body.email})
            await mongoose.disconnect()
            if (user && await user.passwordComparison(req.body.password)) {
                req.flash('success', `${user.fullName} logged in successfully!`)
                res.redirect('/')
            } else {
                req.flash('error', 'Your email or password is incorrect. Please try again.')
                res.redirect('/users/login')
            }

            /*if (await user.emailComparison(req.body.email)) {
                req.flash('success', `${user.fullName} logged in successfully!`)
                res.redirect('/')
            } else {
                req.flash('error', 'Your email or password is incorrect. Please try again')
                res.redirect('/users/login')
            }*/
        } catch (error) {
            req.flash('error', 'Your email or password is incorrect. Please try again.')
            res.redirect('/users/login')
        }
    }
}

const getUserParams = body => {
    return {
        name: {
            first: body.first,
            last: body.last,
        },
        phone: body.phone,
        email: body.email,
        password: body.password
    }
}

exports.registerValidations = [
    body('first')
        .notEmpty().withMessage('First name is required')
        .isLength({min: 2}).withMessage('First name must be at least 2 characters long'),
    body('last')
        .notEmpty().withMessage('Last name is required')
        .isLength({min: 2}).withMessage('Last name must be at least 2 characters long'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 10}).withMessage('Password must be at least 10 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Email is not valid'),
    body('phone').isMobilePhone(['en-US']).withMessage('Phone number is not valid')
]