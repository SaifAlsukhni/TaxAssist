exports.AbstractTaxesStore = class AbstractTaxesStore {
    async update(key, title, body, body2) { }
    async create(key, title, body, body2) { }
    async read(key) { }
    async destroy(key) { }
    async count() { }
}

const mongoose = require('mongoose')
const TaxSchema = new mongoose.Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: [true, 'Business name is required,'],
    },
    body: {
        type: String,
        required: [true, 'Receipts entry is required,']
    },
    body2: {
        type: String,
        required: [true, 'Exemptions entry is required,']
    }
})

exports.Tax = mongoose.model('taxes', TaxSchema)