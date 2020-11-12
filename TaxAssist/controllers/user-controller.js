let User = require('../models/user').User
const { body, validationResult} = require('express-validator')
const passport = require('passport')

exports.userController = {
    create: async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('/users/register')
        } else {
            try {
                let userParams = getUserParams(req.body)
                let newUser = new User(userParams)
                let user = await User.register(newUser, req.body.password)
                req.flash('success', `Account created successfully. Welcome to TaxAssist, ${user.fullName}!`)
                res.redirect('/')
            } catch (error) {
                console.log(`Error saving user: ${error.message}`)
                req.flash('error', 'That email already exists. Please use a different email.')
                res.redirect('/users/register')
            }
        }
    },

    authenticate: async (req, res, next) => {
        await passport.authenticate('local', function (err, user, info) {
            if (err)
                return next(err)
            if (!user) {
                req.flash('error', 'Incorrect email or password. Please try again.')
                return res.redirect('back')
            }
            req.logIn(user,  function (err) {
                if (err)
                    return next(err)
                req.flash('success', `${user.fullName} logged in`)
                return res.redirect('/')
            })
        })(req, res, next);
    },

    account: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                let user = await User.findOne({ _id: req.user.id.trim()})
                res.render('users/Account', {
                    title: 'View Account',
                    userId: req.user.id,
                    userFirst: user.name.first,
                    userLast: user.name.last,
                    userPhone: user.phone,
                    userEmail: user.email,
                    layout: 'layout',
                    styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']
                })
            } catch (err) {
                next(err)
            }
        } else {
            req.flash('error', 'You must log in to access this page.')
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