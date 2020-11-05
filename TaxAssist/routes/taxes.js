const express = require('express');
const router = express.Router();
let taxesStore = require('../app').taxesStore

router.get('/add', async (req, res, next) => {
    try {
        res.render('taxes/add_tax', {
            isCreate: true,
            title: 'Add Tax Info',
            taxKey: await taxesStore.count(),
            layout: 'layout',
            styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']
        })
    } catch (err) {
        next(err)
    }
})

router.post('/save', async (req, res, next) => {
    try {
        let tax;
        if(req.body.saveMethod === 'create')
            tax = await taxesStore.create(req.body.taxKey, req.body.title, req.body.body, req.body.body2)
        else
            tax = await taxesStore.update(req.body.taxKey, req.body.title, req.body.body, req.body.body2)
        res.redirect('/taxes/view?key=' + req.body.taxKey)
    } catch (err) {
        next(err)
    }
})

router.get('/view', async (req, res, next) => {
    try {
        let tax = await taxesStore.read(req.query.key)
        res.render('taxes/view_tax', {
            title: 'View Tax Info',
            taxTitle: tax.title,
            taxKey: tax.key,
            taxBody: tax.body,
            taxBody2: tax.body2,
            layout: 'layout',
            styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']
        })
    } catch (err) {
        next(err)
    }
})

router.get('/edit', async (req, res, next) => {
    try {
        let tax = await taxesStore.read(req.query.key)
        res.render('taxes/edit_tax', {
            isCreate: false,
            title: 'Edit Tax Info',
            taxTitle: tax.title,
            taxKey: tax.key,
            taxBody: tax.body,
            taxBody2: tax.body2,
            layout: 'layout',
            styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']
        })
    } catch (err) {
        next(err)
    }
})

router.get('/destroy', async (req, res, next) => {
    try {
        let tax = await taxesStore.destroy(req.query.key)
        res.redirect('/taxes/all')
    } catch (err) {
        next(err)
    }
})

router.get('/all', async function(req, res, next) {
    try {
        let allTaxes = await taxesStore.findAllTaxes()
        res.render('taxes/view_all', {
            title: 'View All Taxes',
            taxList: allTaxes,
            layout: 'layout',
            styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']})
    } catch (err) {
        next(err)
    }
})

module.exports = router;