let receipts = require('./receipts')
let EventEmitter = require('events').EventEmitter

exports.addDeductions = function () {
    console.log("Deduction amounts are entered here.")


    let emitter = new EventEmitter()
    let receipt = receipts.addReceipts(emitter)

    let counter = 1
    while (counter <= 10) {
        console.log('Pre-emitter ' + counter)
        emitter.emit('event', counter)
        console.log('Post-emitter ' + counter)
        counter++
    }
}
