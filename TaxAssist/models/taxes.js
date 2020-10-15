const _tax_key = Symbol('key')
const _tax_title = Symbol('title')
const _tax_body = Symbol('body')

exports.Tax = class Tax {
    constructor(key, title, body) {
        this[_tax_key] = key
        this[_tax_title] = title
        this[_tax_body] = body
    }

    get key() { return this[_tax_key] }
    get title() { return this[_tax_title] }
    set title(newTitle) { this[_tax_title] = newTitle }
    get body() { return this[_tax_body] }
    set body(newBody) { this[_tax_body] = newBody }


}

exports.AbstractTaxesStore = class AbstractTaxesStore {
    async close() { }
    async update(key, title, body) { }
    async create(key, title, body) { }
    async read(key) { }
    async destroy(key) { }
    async keyList() { }
    async count() { }
}

