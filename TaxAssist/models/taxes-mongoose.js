/*
let Tax = require('./taxes').Tax
let AbstractTaxesStore = require('./taxes').AbstractTaxesStore

exports.MongooseTaxesStore = class MongooseTaxesStore extends AbstractTaxesStore {

    async update(id, title, body, body2) {
        let tax = await Tax.findOneAndUpdate({key: key}, {
            title: title,
            body: body,
            body2: body2
        })
        return tax
    }

    async create(key, title, body, body2) {
        let count = await Tax.countDocuments({})
        let tax = new Tax({
            key: count,
            title: title,
            body: body,
            body2: body2
        })
        await tax.save()
        return tax
    }

    async read(key) {
        const tax = await Tax.findOne({key: key})
        return tax
    }

    async destroy(key) {
        let tax = await Tax.findOneAndDelete({key: key})
        return tax
    }

    async count() {
        const count = await Tax.countDocuments({})
        return count
    }

    async findAllTaxes() {
        const taxes = await Tax.find({})
        return taxes.map(tax => {
            return {
                key: tax.key,
                title: tax.title
            }
        })
    }
}*/
