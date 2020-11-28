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
                req.flash('success', `Account created successfully. <br>Welcome to TaxAssist, ${user.fullName}!`)
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
                req.flash('success', `${user.fullName} logged in!`)
                return res.redirect('/')
            })
        })(req, res, next);
    },

    account: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                let user = await User.findOne({ _id: req.user.id.trim()})
                res.render('users/account', {
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
    },

    editAccountView: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                let user = await User.findOne({ _id: req.user.id.trim()})
                res.render('users/edit_account', {
                    title: 'Edit Account',
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
    },

    editAccount: async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('back')
        } else {
            try {
                req.user = await User.findByIdAndUpdate({_id: req.user.id.trim() }, {
                    name: {
                        first: req.body.first,
                        last: req.body.last,
                    },
                    phone: req.body.phone }, { new: true })
                req.flash('success', 'Account updated successfully.')
                res.redirect('/users/account')
            } catch (error) {
                console.log(`Error saving user: ${error.message}`)
                req.flash('error', 'Failed to update account. Please try again.')
                res.redirect('/users/account')
            }
        }
    },

    changePasswordView: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                let user = await User.findOne({ _id: req.user.id.trim()})
                res.render('users/change_password', {
                    title: 'Change Password',
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
    },

    passwordChange: async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('back')
        } else {
            try {
                await User.findOne({ _id: req.user.id.trim() }, (err, user, info) => {
                    user.changePassword(req.body.password, req.body.newPassword, (err, user, info) => {
                        req.flash('success', 'Password changed successfully.')
                        res.redirect('/users/account')
                    })
                })
            } catch (error) {
                console.log(`Error saving user: ${error.message}`)
                req.flash('error', 'Failed to change password. Please try again.')
                res.redirect('/users/account')
            }
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

exports.editValidations = [
    body('first')
        .notEmpty().withMessage('First name is required')
        .isLength({min: 2}).withMessage('First name must be at least 2 characters long'),
    body('last')
        .notEmpty().withMessage('Last name is required')
        .isLength({min: 2}).withMessage('Last name must be at least 2 characters long'),
    body('phone').isMobilePhone(['en-US']).withMessage('Phone number is not valid')
]

exports.passwordValidations = [
    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({min: 10}).withMessage('New password must be at least 10 characters')
]