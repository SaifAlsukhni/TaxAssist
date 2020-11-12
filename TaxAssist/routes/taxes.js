const express = require('express');
const router = express.Router();
const {taxesController} = require("../controllers/taxes-controller");

router.get('/add', async (req, res, next) => {
    await taxesController.add(req, res, next)
})

router.post('/save', async (req, res, next) => {
    await taxesController.save(req, res, next)
})

router.get('/view', taxesController.view, async (req, res, next) => {
    res.render('taxes/view_tax', {
        title: 'View Tax Info',
        layout: 'layout',
        styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']
    })
})

router.get('/edit', taxesController.edit, async (req, res, next) => {
    res.render('taxes/edit_tax', {
        isCreate: false,
        title: 'Edit Tax Info',
        layout: 'layout',
        styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']
    })
})

router.get('/destroy', taxesController.destroy, async (req, res, next) => {
    res.redirect('/taxes/all')
})

router.get('/all', taxesController.all, async function(req, res, next) {
    res.render('taxes/view_all', {
        title: 'View All Taxes',
        layout: 'layout',
        styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']})
})

module.exports = router;