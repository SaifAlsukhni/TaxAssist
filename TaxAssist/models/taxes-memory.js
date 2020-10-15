let Tax = require('./taxes').Tax
let AbstractTaxesStore = require('./taxes').AbstractTaxesStore

let taxes = []
exports.InMemoryTaxesStore = class InMemoryTaxesStore extends AbstractTaxesStore {

    async close() { }

    async update(key, title, body) {
        taxes[key].title = title
        taxes[key].body = body
        return taxes[key]
    }

    async create(key, title, body) {
        taxes[key] = new Tax(key, title, body)
        return taxes[key]
    }

    async read(key) {
        if (taxes[key])
            return taxes[key]
        else
            throw new Error(`Tax${key} does not exist`)
    }

    async destroy(key) {
        if (taxes[key])
            delete taxes[key]
        else
            throw new Error(`Tax${key} does not exist`)
    }

    async keyList() {
        return Object.keys(taxes)
    }

    async count() {
        return taxes.length
    }
}