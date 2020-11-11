let Tax = require('../models/taxes').Tax

exports.taxesController = {
    add: async (req, res, next) => {
        try {
            res.render('taxes/add_tax', {
                isCreate: true,
                title: 'Add Tax Info'
            })
        } catch (err) {
            next(err)
        }
    },

    save: async (req, res, next) => {
        try {
            let tax
            if(req.body.saveMethod === 'create')
                tax = await create(req.body.title, req.body.body, req.body.body2)
            else
                tax = await update(req.body.taxId, req.body.title, req.body.body, req.body.body2)
            res.redirect(`/taxes/view?id=${tax.id}`)
        } catch (err) {
            next(err)
        }
    },

    view: async (req, res, next) => {
        try {
            let tax = await Tax.findOne({ _id: req.query.id.trim()})
            res.render('taxes/view_tax', {
                title: 'View Tax Info',
                taxId: req.query.id,
                taxTitle: tax.title,
                taxBody: tax.body,
                taxBody2: tax.body2,
                layout: 'layout',
                styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']
            })
        } catch (err) {
            next(err)
        }
    },

    edit: async (req, res, next) => {
        try {
            let tax = await Tax.findOne({ _id: req.query.id.trim()})
            res.render('taxes/edit_tax', {
                isCreate: false,
                title: 'Edit Tax Info',
                taxId: req.query.id,
                taxTitle: tax.title,
                taxBody: tax.body,
                taxBody2: tax.body2,
                layout: 'layout',
                styles: ['/assets/stylesheets/stylesheet.css', '/assets/stylesheets/style.css', '/assets/vendor/bootstrap/css/bootstrap.min.css']
            })
        } catch (err) {
            next(err)
        }
    },

    destroy: async (req, res, next) => {
        try {
            let tax = await Tax.findByIdAndDelete({ _id: req.query.id.trim()})
            res.redirect('/taxes/all')
        } catch (err) {
            next(err)
        }
    },

    all: async (req, res, next) => {
        try {
            let taxes = await Tax.find({})
            let allTaxes = taxes.map(tax => {
                return {
                    id: tax.id,
                    taxTitle: tax.title
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
    }
}

create = async (title, body, body2) => {
    let tax = new Tax({
        title: title,
        body: body,
        body2: body2
    })
    tax = await tax.save()
    return tax
}

update = async (id, title, body, body2) => {
    id = id.trim()
    let tax= await Tax.findByIdAndUpdate({ _id: id}, { title: title, body: body, body2: body2 }, { new: true } )
    return tax
}


