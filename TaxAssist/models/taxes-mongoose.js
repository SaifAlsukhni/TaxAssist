let Tax = require('./taxes').Tax
let AbstractTaxesStore = require('./taxes').AbstractTaxesStore

const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (err) {
        console.log(err)
    }
}

exports.MongooseTaxesStore = class MongooseTaxesStore extends AbstractTaxesStore {

    async update(key, title, body, body2) {
        await connectDB()
        let tax = await Tax.findOneAndUpdate({key: key}, {
            title: title,
            body: body,
            body2: body2
        })
        await mongoose.disconnect()
        return tax
    }

    async create(key, title, body, body2) {
        await connectDB()
        let count = await Tax.countDocuments({})
        let tax = new Tax({
            key: count,
            title: title,
            body: body,
            body2: body2
        })
        await tax.save()
        await mongoose.disconnect()
        return tax
    }

    async read(key) {
        await connectDB()
        const tax = await Tax.findOne({key: key})
        await mongoose.disconnect()
        return tax
    }

    async destroy(key) {
        await connectDB()
        let tax = await Tax.findOneAndDelete({key: key})
        await mongoose.disconnect()
        return tax
    }

    async count() {
        await connectDB()
        const count = await Tax.countDocuments({})
        await mongoose.disconnect()
        return count
    }

    async findAllTaxes() {
        await connectDB()
        const taxes = await Tax.find({})
        await mongoose.disconnect()
        return taxes.map(tax => {
            return {
                key: tax.key,
                title: tax.title
            }
        })
    }
}