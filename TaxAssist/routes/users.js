const express = require('express')
const router = express.Router()
const { registerValidations, userController } = require('../controllers/user-controller')

router.get('/register', async (req, res, next) => {
    res.render('users/register', {
        title: 'Register',
        layout: 'layout',
        styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']
    })
})

router.post('/register', registerValidations, async (req, res, next) => {
    await userController.create(req, res, next)
})

router.get('/login', async (req, res, next) => {
    res.render('users/login', {
        title: 'Login',
        layout: 'layout',
        styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']
    })
})

router.post('/login', async (req, res, next) => {
    await userController.authenticate(req, res)
})

router.get('/logout', function(req, res){
    req.logout()
    res.redirect('/')
})

router.get('/account', async (req, res, next) => {
    await userController.account(req, res, next)
})

module.exports = router