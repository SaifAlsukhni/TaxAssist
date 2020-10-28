const _tax_key = Symbol('key')
const _tax_title = Symbol('title')
const _tax_body = Symbol('body')
const _tax_body2 = Symbol('body2')

exports.Tax = class Tax {
    constructor(key, title, body, body2) {
        this[_tax_key] = key
        this[_tax_title] = title
        this[_tax_body] = body
        this[_tax_body2] = body2
    }

    get key() { return this[_tax_key] }
    get title() { return this[_tax_title] }
    set title(newTitle) { this[_tax_title] = newTitle }
    get body() { return this[_tax_body] }
    set body(newBody) { this[_tax_body] = newBody }
    get body2() { return this[_tax_body2] }
    set body2(newBody2) { this[_tax_body2] = newBody2 }


}

exports.AbstractTaxesStore = class AbstractTaxesStore {
    async close() { }
    async update(key, title, body, body2) { }
    async create(key, title, body, body2) { }
    async read(key) { }
    async destroy(key) { }
    async keyList() { }
    async count() { }
}

