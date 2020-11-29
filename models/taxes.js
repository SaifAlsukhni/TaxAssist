const mongoose = require('mongoose')

const TaxSchema = new mongoose.Schema({
    business: {
        type: String,
        required: [true, 'Business name is required'],
    },
    receipts: {
        type: String,
        required: [true, 'Receipts entry is required']
    },
    exemptions: {
        type: String,
        required: [true, 'Exemptions entry is required']
    },
    month: {
        type: String,
        required: [true, 'Month selection is required']
    }
})

exports.Tax = mongoose.model('taxes', TaxSchema)