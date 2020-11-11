const mongoose = require('mongoose')

const TaxSchema = new mongoose.Schema({
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