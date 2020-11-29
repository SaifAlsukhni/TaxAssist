let { Tax } = require('../models/taxes')
let { User } = require('../models/user')
const { body, validationResult} = require('express-validator')

exports.taxesController = {
    add: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                res.render('taxes/add_tax', {
                    isCreate: true,
                    title: 'Add Tax Info',
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

    save: async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('back')
        } else {
            try {
                let tax
                if(req.body.saveMethod === 'create') {
                    tax = await create(req.body.business, req.body.receipts, req.body.exemptions, req.body.month)
                    req.user.taxes.push(tax.id.trim())
                    req.user = await User.findByIdAndUpdate({_id: req.user.id.trim() }, { taxes: req.user.taxes}, { new: true })
                    req.flash('success', `Taxes for ${tax.business} (${tax.month}) saved successfully.`)
                    res.redirect(`/taxes/view?id=${tax.id}`)
                } else
                    tax = await update(req.body.taxId, req.body.business, req.body.receipts, req.body.exemptions, req.body.month)
                    req.flash('success', `Taxes for ${tax.business} (${tax.month}) saved successfully.`)
                    res.redirect(`/taxes/view?id=${tax.id}`)
            } catch (err) {
                next(err)
            }
        }
    },

    view: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                let tax = await Tax.findOne({ _id: req.query.id.trim()})
                res.render('taxes/view_tax', {
                    title: 'View Tax Info',
                    taxId: req.query.id,
                    taxBusiness: tax.business,
                    taxReceipts: tax.receipts,
                    taxExemptions: tax.exemptions,
                    taxMonth: tax.month,
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

    edit: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                let tax = await Tax.findOne({ _id: req.query.id.trim()})
                res.render('taxes/edit_tax', {
                    isCreate: false,
                    title: 'Edit Tax Info',
                    taxId: req.query.id,
                    taxBusiness: tax.business,
                    taxReceipts: tax.receipts,
                    taxExemptions: tax.exemptions,
                    taxMonth: tax.month,
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

    destroy: async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect(`/taxes/view?id=${tax.id}`)
        } else {
            try {
                let tax = await Tax.findByIdAndDelete({ _id: req.query.id.trim()})
                req.user.taxes.remove(tax.id.trim())
                req.user = await User.findByIdAndUpdate({_id: req.user.id.trim() }, { taxes: req.user.taxes})
                req.flash('success', `Taxes for ${tax.business} (${tax.month}) deleted successfully.`)
                res.redirect('/taxes/all')
                return tax
            } catch (err) {
                next(err)
            }
        }
    },

    all: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                let taxIds = req.user.taxes
                let taxPromises = taxIds.map(id => Tax.findOne({ _id: id }))
                let taxes = await Promise.all(taxPromises)
                let allTaxes = taxes.map(tax => {
                    return {
                        id: tax.id,
                        taxBusiness: tax.business,
                        taxMonth: tax.month
                    }
                })
                res.render('taxes/view_all', {
                    title: 'View All Taxes',
                    taxList: allTaxes,
                    layout: 'layout',
                    styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']})
            } catch (err) {
                next(err)
            }
        } else {
            req.flash('error', 'You must log in to access this page.')
            res.redirect('/users/login')
        }
    },

    quick: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                let taxIds = req.user.taxes
                let taxPromises = taxIds.map(id => Tax.findOne({ _id: id }))
                let taxes = await Promise.all(taxPromises)
                let allTaxes = taxes.map(tax => {
                    return {
                        taxId: req.query.id,
                        taxBusiness: tax.business,
                        taxReceipts: tax.receipts,
                        taxExemptions: tax.exemptions,
                        taxMonth: tax.month
                    }
                })
                res.render('taxes/quick_view', {
                    title: 'Quick View Taxes',
                    taxList: allTaxes,
                    layout: 'layout',
                    styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']})
            } catch (err) {
                next(err)
            }
        } else {
            req.flash('error', 'You must log in to access this page.')
            res.redirect('/users/login')
        }
    },

    calendar: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                res.render('taxes/calendar', {
                    title: 'Calendar',
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

create = async (business, receipts, exemptions, month) => {
    let tax = new Tax({
        business: business,
        receipts: receipts,
        exemptions: exemptions,
        month: month
    })
    tax = await tax.save()
    return tax
}

update = async (id, business, receipts, exemptions, month) => {
    id = id.trim()
    let tax = await Tax.findByIdAndUpdate({ _id: id}, { business: business, receipts: receipts, exemptions: exemptions, month: month }, { new: true } )
    return tax
}

const getTaxParams = body => {
    return {
        business: body.business,
        receipts: body.receipts,
        exemptions: body.exemptions,
        month: body.month
    }
}

exports.taxValidations = [
    body('business')
        .notEmpty().withMessage('Business name is required')
        .isLength({min: 4}).withMessage('Business name must be at least 4 characters long'),
    body('receipts')
        .notEmpty().withMessage('Receipts field is required'),
    body('exemptions')
        .notEmpty().withMessage('Exemptions field is required'),
    body('month')
        .notEmpty().withMessage('Month selection is required')
]
